
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServer } = require('@apollo/server');

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schema');

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

const startServer = async () => {
    await server.start();
}
startServer();

app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.authorization })
    })
);

const listenOn = async () => {
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
}
listenOn()

