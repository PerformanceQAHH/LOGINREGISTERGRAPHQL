"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.secretKey = constants_1.SECRET_KEY;
    }
    sign(data) {
        return jsonwebtoken_1.default.sign({ user: data.user }, this.secretKey, { expiresIn: 24 * 60 * 60 });
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (e) {
            return 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token';
        }
    }
}
exports.default = JWT;
