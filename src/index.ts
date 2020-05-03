import { environment } from './environment';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './resolvers';
import { MongooseProvider } from './providers/mongoose.provider';

MongooseProvider.connect();

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen(environment.port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});