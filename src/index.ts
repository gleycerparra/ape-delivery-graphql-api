import { GraphQLJSON } from 'graphql-type-json';
import { environment } from './environment';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './modules/products/resolvers';
import { MongooseProvider } from './providers/mongoose.provider';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import { isTokenValid } from './helpers/verify-token';

MongooseProvider.connect();


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Date: GraphQLDate,
        Time: GraphQLTime,
        DateTime: GraphQLDateTime,
        JSON: GraphQLJSON,
        ...resolvers
    },
    introspection: environment.apollo.introspection,
    playground: environment.apollo.playground,
    context: async ({ req }) => {
        // simple auth check on every request
        const token = req.headers.authorization;
        const result: any = await isTokenValid(token);

        if (result.error) {
            throw new AuthenticationError('Unauthorized');
        }

        return {
            user: result.user.decoded
        }


    },
});

// The `listen` method launches a web server.
server.listen(environment.port, () => {
    console.log(`🚀 Server ready at port ${environment.port}`);
});