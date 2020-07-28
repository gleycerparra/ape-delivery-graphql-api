import { GraphQLJSON } from 'graphql-type-json';
import { environment } from './environment';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import resolvers from './modules/products/resolvers';
import { MongooseProvider } from './providers/mongoose.provider';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import validateTokenMiddleware from './middlewares/validate-token.middleware';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import cors from 'cors';

MongooseProvider.connect();

const app = express();

const corsOptions = {
    origin: [`${environment.port}`],
    credentials: true,
  };
  app.use(cors(corsOptions));

app.use(validateTokenMiddleware);
app.use(errorMiddleware);

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Date: GraphQLDate,
        Time: GraphQLTime,
        DateTime: GraphQLDateTime,
        JSON: GraphQLJSON,
        ...resolvers
    },
    playground: {
        settings: {
            'request.credentials': 'same-origin',
        },
    },
/*     context: ({ req }) => {

        const token = req.headers.authorization || '';

        return { user };
    }, */
});



server.applyMiddleware({ app });
// The `listen` method launches a web server.
app.listen(environment.port, () => {
    console.log(`🚀 Server ready at port ${environment.port}`);
});