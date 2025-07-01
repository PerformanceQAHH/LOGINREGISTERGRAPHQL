"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const chalk_1 = __importDefault(require("chalk"));
class Database {
    async init() {
        const MONGODB = String(process.env.DATABASE);
        const client = await mongodb_1.default.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = await client.db();
        if (client.isConnected()) {
            console.log('==========DATABASE==========');
            console.log(`STATUS: ${chalk_1.default.greenBright('ONLINE')}`);
            console.log(`DATABASE: ${chalk_1.default.greenBright(db.databaseName)}`);
        }
        return db;
    }
}
exports.default = Database;
