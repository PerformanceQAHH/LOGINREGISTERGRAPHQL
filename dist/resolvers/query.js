"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../lib/jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const query = {
    Query: {
        async users(_, __, { db }) {
            return await db.collection('users').find().toArray();
        },
        async login(_, { email, password }, { db }) {
            const user = await db.collection('users').findOne({ email });
            if (user === null) {
                return {
                    status: false,
                    message: 'Login INCORRECTO. No existe el usuario',
                    token: null
                };
            }
            if (!bcryptjs_1.default.compareSync(password, user.password)) {
                return {
                    status: false,
                    message: 'Login INCORRECTO. Contraseña incorrecta',
                    token: null
                };
            }
            delete user.password;
            return {
                status: true,
                message: 'Login Correcto',
                token: new jwt_1.default().sign({ user })
            };
        },
        me(_, __, { token }) {
            let info = new jwt_1.default().verify(token);
            if (info === 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token') {
                return {
                    status: false,
                    message: info,
                    user: null
                };
            }
            return {
                status: true,
                message: 'Token correcto',
                user: info.user
            };
        }
    }
};
exports.default = query;
