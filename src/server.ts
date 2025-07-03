import express from 'express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import environments from './config/environments';
import Database from './config/database';
import expressPlayground from 'graphql-playground-middleware-express';
import jwt from 'jsonwebtoken';

if (process.env.NODE_ENV !== 'production') {
    const envs = environments;
    // Puedes usar envs aquí si lo necesitas
}

async function init() {
    const app = express();

    app.use('*', cors());
    app.use(compression());

    const database = new Database();
    const db = await database.init();

    
    
    
    
    const context = async ({ req, connection }: any) => {
    const authHeader = req?.headers?.authorization || connection?.authorization || '';
    let user = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_clave_secreta');
            user = decoded;
            } catch (error) {
            console.error('Token inválido:', error);
            }
        }
    }

    return { db, user };
};




    const server = new ApolloServer({
    schema,
    context,
        introspection: true,
    });

    await server.start();
    server.applyMiddleware({ app });

 app.get('/', expressPlayground({ endpoint: '/graphql' }));

    const PORT = process.env.PORT || 5300;
    const httpServer = createServer(app);
    httpServer.listen({ port: PORT }, () =>
        console.log(`🚀 API GraphQL corriendo en http://localhost:${PORT}/graphql`)
    );
}

init();