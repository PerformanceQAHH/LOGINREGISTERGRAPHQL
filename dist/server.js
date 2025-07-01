"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = __importDefault(require("./schema"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const environments_1 = __importDefault(require("./config/environments"));
const database_1 = __importDefault(require("./config/database"));
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
if (process.env.NODE_ENV !== 'production') {
    const envs = environments_1.default;
}
async function init() {
    const app = (0, express_1.default)();
    app.use('*', (0, cors_1.default)());
    app.use((0, compression_1.default)());
    const database = new database_1.default();
    const db = await database.init();
    const context = async ({ req, connection }) => {
        const token = req ? req.headers.authorization : connection.authorization;
        return { db, token };
    };
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema_1.default,
        context,
        introspection: true
    });
    server.applyMiddleware({ app });
    app.use('/', (0, graphql_playground_middleware_express_1.default)({
        endpoint: '/graphql'
    }));
    const PORT = process.env.PORT || 5300;
    const httpServer = (0, http_1.createServer)(app);
    httpServer.listen({ port: PORT }, () => console.log(`Sistema de Autenticación JWT API GraphQL http://localhost:${PORT}/graphql`));
}
init();
