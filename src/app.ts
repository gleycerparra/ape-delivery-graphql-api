import 'reflect-metadata';
import { GraphQLJSON } from 'graphql-type-json';
import { environment } from './environment';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import resolvers from './resolvers';
import { container, types } from './inversify.config';
import * as mongoose from 'mongoose';
import { GraphQLObjectID } from 'graphql-scalars';
import ICategoryRepository from './modules/products/categories/repository/category.interface';

export default class App {

    private server: ApolloServer;
    private connection: typeof mongoose;

    constructor() {
        this.connectToDatabase();
    }

    public startApolloServer() {
        this.server = new ApolloServer({
            typeDefs,
            resolvers: {
                Date: GraphQLDate,
                Time: GraphQLTime,
                DateTime: GraphQLDateTime,
                JSON: GraphQLJSON,
                ObjectID: GraphQLObjectID,
                ...resolvers
            },
            introspection: environment.apollo.introspection,
            playground: environment.apollo.playground,
            dataSources: () => {
                return {
                    productsCategories: container.get<ICategoryRepository>(types.ICategoryRepository) as any
                };
            }
            /*    context: async ({ req }) => {
                   const token = req.headers.authorization;
                   if (token && token.includes('Bearer ')) {
                       const result: any = await isTokenValid(token);
                       if (result.error) {
                           throw new AuthenticationError('Unauthorized');
                       }
                       return {
                           user: result.decoded
                       }
                   }
                   else {
                       throw new AuthenticationError('Unauthorized');
                   }
               }, */
        });

        this.server.listen(environment.port).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });

    }

    private async connectToDatabase() {
        try {
            this.connection = await mongoose.connect(environment.mongoDb.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });

            if (this.connection) {
                console.log(`🐘 Connected to MongoDB`);
            }

        } catch (error) {
            console.log('Connection error');
            console.log(error);
        }
    }
}