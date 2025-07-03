
"use strict";
const { ObjectId } = require('mongodb');
const bcrypt = require("bcryptjs");
const { Datetime } = require("../lib/datetime");

const mutation = {
        Mutation: {
            async register(_, { user }, { db }) {
            const userCheck = await db.collection('users').findOne({ email: user.email });
            if (userCheck !== null) {
                return {
                status: false,
                message: `Usuario NO registrado porque ya existe el usuario ${user.email}`,
                user: null
            };
        }

            const lastUser = await db.collection('users').find()
            .limit(1).sort({ registerDate: -1 }).toArray();

            user.id = lastUser.length === 0 ? 1 : lastUser[0].id + 1;
            user.password = bcrypt.hashSync(user.password, 10);
            user.registerDate = new Datetime().getCurrentDateTime();

            return await db.collection('users').insertOne(user)
            .then(() => ({
            status: true,
            message: `Usuario ${user.name} ${user.lastname} añadido correctamente`,
                user
            }))
            .catch(() => ({
            status: false,
            message: `Usuario NO añadido correctamente`,
                user: null
                }));
            },

        async createNote(_, { content }, { db, user }) {
            if (!user) {
                return {
                status: false,
                message: "No autorizado",
                note: null
            };
        }

        const newNote = {
            content,
            createdAt: new Date().toISOString(),
            createdBy: new ObjectId(user._id)
        };

        const result = await db.collection('notes').insertOne(newNote);

        return {
        status: true,
        message: "Nota creada correctamente",
        note: {
        id: result.insertedId,
        ...newNote
        }
    };
},

        logout(_, __, { user }) {
        if (!user) {
            return {
            status: false,
            message: "No autorizado",
            user: null
        };
    }

    return {
            status: true,
            message: "Sesión cerrada correctamente",
            user: null
            };
        }
    }
};

module.exports = mutation;
