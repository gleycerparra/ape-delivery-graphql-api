import { GraphQLJSON } from 'graphql-type-json';
import { environment } from './environment';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import resolvers from './modules/products/resolvers';
import { MongooseProvider } from './providers/mongoose.provider';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import validateTokenMiddleware from './middlewares/validate-token.middleware';
import errorMiddleware from './middlewares/error.middleware';
import express = require('express');

MongooseProvider.connect();

const app: express.Application = express();

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Date: GraphQLDate,
        Time: GraphQLTime,
        DateTime: GraphQLDateTime,
        JSON: GraphQLJSON,
        ...resolvers
    },
    context: (req: any) => req.req.user,
});

app.use(validateTokenMiddleware);
app.use(errorMiddleware);

server.applyMiddleware({ app });
// The `listen` method launches a web server.
app.listen(environment.port, () => {
    console.log(`🚀 Server ready at port ${environment.port}`);
});