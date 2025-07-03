"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../lib/jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const query = {
    Query: {
        users(_1, __1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, __, { db }) {
                return yield db.collection('users').find().toArray();
            });
        },
        login(_1, _a, _b) {
            return __awaiter(this, arguments, void 0, function* (_, { email, password }, { db }) {
                const user = yield db.collection('users').findOne({ email });
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
            });
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
