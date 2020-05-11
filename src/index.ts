import { ProductService } from './modules/products/product.service';
import { environment } from './environment';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './modules/products/resolvers';
import { MongooseProvider } from './providers/mongoose.provider';
import { container } from './inversify.config';
import { IProductRepository } from './modules/products/repository/product.interface';
import RepositoryTypes from './core/repository.types';
import { ProductRepository } from './modules/products/repository/product.repository';


MongooseProvider.connect();

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen(environment.port).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});