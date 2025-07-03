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
const datetime_1 = require("../lib/datetime");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mutation = {
    Mutation: {
        register(_1, _a, _b) {
            return __awaiter(this, arguments, void 0, function* (_, { user }, { db }) {
                const userCheck = yield db.collection('users').findOne({ email: user.email });
                if (userCheck !== null) {
                    return {
                        status: false,
                        message: `Usuario NO registrado porque ya existe el usuario ${user.email}`,
                        user: null
                    };
                }
                const lastUser = yield db.collection('users').find()
                    .limit(1).sort({ registerDate: -1 }).toArray();
                if (lastUser.length === 0) {
                    user.id = 1;
                }
                else {
                    user.id = lastUser[0].id + 1;
                }
                user.password = bcryptjs_1.default.hashSync(user.password, 10);
                user.registerDate = new datetime_1.Datetime().getCurrentDateTime();
                return yield db.collection('users').insertOne(user)
                    .then((result) => {
                    return {
                        status: true,
                        message: `Usuario ${user.name} ${user.lastname} añadido correctamente`,
                        user
                    };
                })
                    .catch((err) => {
                    return {
                        status: false,
                        message: `Usuario NO añadido correctamente`,
                        user: null
                    };
                });
            });
        }
    }
};
exports.default = mutation;
