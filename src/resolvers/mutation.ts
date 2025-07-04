import { NoteModel } from "../models/Note";
import { IResolvers } from "graphql-tools";
import { Datetime } from "../lib/datetime";
import bcryptjs from 'bcryptjs';

const mutation: IResolvers = {
    Mutation: {
        async register(_: void, { user }, { db }): Promise<any> {
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
            user.password = bcryptjs.hashSync(user.password, 10);
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

        async createNote(_: void, { content }, { user }): Promise<any> {
            if (!user) {
                return {
                    status: false,
                    message: "No autorizado",
                    note: null
                };
            }

            const newNote = new NoteModel({
                content,
                createdBy: user.id || user.id || user.email,
                createdAt: new Date().toISOString()
            });

            await newNote.save();

            return {
                status: true,
                message: "Nota creada correctamente",
                note: newNote
            };
        }
    }
};

export default mutation;