import 'reflect-metadata';
import { GraphQLJSON } from 'graphql-type-json';
import { environment } from './environment';
import { ApolloServer, AuthenticationError } from 'apollo-server';
import { typeDefs } from './schema';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import resolvers from './resolvers';
import { container, types } from './inversify.config';
import * as mongoose from 'mongoose';
import { dataSources } from "./data-sources";
console.log("dataSources", dataSources);
import { GraphQLObjectID } from 'graphql-scalars';
import { IPageInfoService, PageInfoService } from './services/page-info.service';
import { IQueryParamsService, QueryParamsService } from './services/query-params.service';
import CategoryRepository from './modules/products/categories/repository/category.repository';
import ICategoryRepository from './modules/products/categories/repository/category.interface';

export default class App {

    private server: ApolloServer;
    private connection: typeof mongoose;

    constructor() {
        this.resolveDIContainer();
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
/*         const pageInfo = container.get<IPageInfoService>(types.IPageInfoService);
        container.get<IQueryParamsService<any>>(types.IQueryParamsService); */
        const category = container.get<ICategoryRepository>(types.ICategoryRepository);
        console.log("resolveDIContainer -> category", category)
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