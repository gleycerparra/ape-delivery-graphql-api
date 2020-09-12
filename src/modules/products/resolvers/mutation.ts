import { Product } from '../interfaces/product';

export const Mutation = {
  createProduct: async (parent: any, { product }: { product: Product }, { dataSources: { products } }) => await products.add(product),
  updateProduct: async (parent: any, { id, product }: { product: Product, id: string }, { dataSources: { products } }) => await products.update(id, product),
  deleteProduct: async (parent: any, { id }: { id: string }, { dataSources: { products } }) => await products.delete(id),
}
