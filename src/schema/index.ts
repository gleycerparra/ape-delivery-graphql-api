import { productTypeDefs } from './../modules/products/schema/index';
import { Query } from './query';
import { Mutation } from './mutation';

export const typeDefs = [
    Query,
    Mutation,
    ...productTypeDefs
];