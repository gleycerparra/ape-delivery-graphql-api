import { GraphQLJSON } from 'graphql-type-json';
import { environment } from './environment';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { typeDefs } from './schema';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import resolvers from './resolvers'
/* import { dataSources } from './data-sources'; */
import { DIContainer } from './inversify.config';
import { ProductRepository } from './modules/products/repository/product.repository';
import * as mongoose from 'mongoose';
import { dataSources } from "./data-sources";

export default class App {

    private server: ApolloServer;
    private container: DIContainer;
    private connection: typeof mongoose;

    constructor() {
        /* this.resolveDIContainer(); */
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
                ...resolvers
            },
            introspection: environment.apollo.introspection,
            playground: environment.apollo.playground,
            dataSources: () => dataSources
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

    private resolveDIContainer(): void {
        this.container = new DIContainer();
        this.container.DIContainer.resolve<ProductRepository>(ProductRepository)
    }

    private async connectToDatabase() {
        try {
            this.connection = await mongoose.connect(environment.mongoDb.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            if (this.connection) {
                console.log(`🐘 Connected to MongoDB`);
            }

        } catch (error) {
            console.log('Connection error');
            console.log(error);
        }
    }
}