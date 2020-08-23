import { ProductRepository } from '../repository/product.repository';
import { Product } from '../interfaces/product';

const productRepository = new ProductRepository();

export const Mutation = {
  createProduct: async (parent: any, { product }: { product: Product }) => await productRepository.add(product),
  updateProduct: async (parent: any, { id, product }: { product: Product, id: string }) => await productRepository.update(id, product),
  deleteProduct: async (parent: any, { id }: { id: string }) => await productRepository.delete(id),
}
