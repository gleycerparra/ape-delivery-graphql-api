import { Product } from '../product';
import { ProductRepository } from '../repository/product.repository';
/* import { container } from '../../../inversify.config';
import { ProductService } from '../product.service';
import RepositoryTypes from '../../../core/repository.types'

let productService = container.get<ProductService>(RepositoryTypes.IProductRepository); */

const productRepository = new ProductRepository();

export const Mutation = {
  createProduct: async (parent: any, { product }: { product: Product }) => await productRepository.add(product),
  updateProduct: async (parent: any, { id, product }: { product: Product, id: string }) => await productRepository.update(id, product),
  deleteProduct: async (parent: any, { id }: { id: string }) => await productRepository.delete(id),
}
