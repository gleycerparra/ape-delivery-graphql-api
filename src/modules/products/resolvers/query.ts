import { QueryParams } from '@app/core/interfaces/query-params.interface';
import { Product } from '../interfaces/product';

export const Query = {
    product: async (_, { id }: { id: string }, { dataSources: { products } }) => await products.get(id),
    products: async (_, args: QueryParams<Product>, { dataSources: { products } }) => {
        return await products.getAll(args);
    },
}
