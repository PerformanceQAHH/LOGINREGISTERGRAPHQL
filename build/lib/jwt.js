"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../config/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWT {
    constructor() {
        this.secretKey = process.env.JWT_SECRET || 'tu_clave_secreta';
    }
    sign(data) {
        return jsonwebtoken.sign({ user: data.user }, this.secretKey, { expiresIn: 24 * 60 * 60 });
    }
    verify(token) {
        try {
            return jsonwebtoken.verify(token, this.secretKey);
        }
        catch (e) {
            return 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token';
        }
    }
}
exports.default = JWT;
