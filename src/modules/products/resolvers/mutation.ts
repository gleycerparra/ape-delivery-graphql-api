import { ProductRepository } from '../repository/product.repository';
import { Product } from '../interfaces/product';

export const Mutation = {
  createProduct: async (parent: any, { product }: { product: Product }, { dataSources: { productRepository } }) => await productRepository.add(product),
  updateProduct: async (parent: any, { id, product }: { product: Product, id: string }, { dataSources: { productRepository } }) => await productRepository.update(id, product),
  deleteProduct: async (parent: any, { id }: { id: string }, { dataSources: { productRepository } }) => await productRepository.delete(id),
}
