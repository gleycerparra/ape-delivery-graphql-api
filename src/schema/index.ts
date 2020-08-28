import { Query } from './query';
import { Mutation } from './mutation';
import { productTypeDefs } from './../modules/products/schema/index';
import CategoryTypeDefs from '../modules/products/categories/schema/index';

export const typeDefs = [
    Query,
    Mutation,
    ...productTypeDefs,
    ...CategoryTypeDefs
];