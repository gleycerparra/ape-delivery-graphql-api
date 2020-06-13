import { GraphQLJSON } from 'graphql-type-json';
import { environment } from './environment';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './modules/products/resolvers';
import { MongooseProvider } from './providers/mongoose.provider';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
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
    introspection: true,
    playground: true,
});

// The `listen` method launches a web server.
server.listen(environment.port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});