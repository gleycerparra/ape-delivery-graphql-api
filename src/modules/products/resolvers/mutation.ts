import { Product } from '../product';
import { container } from '../../../inversify.config';
import { ProductService } from '../product.service';
import RepositoryTypes from '../../../core/repository.types'

let productService = container.get<ProductService>(RepositoryTypes.IProductRepository);

export const Mutation = {
  createProduct: (parent: any, { product }: { product: Product }) => productService.add(product),
  updateProduct: (parent: any, { id, product }: { product: Product, id: string }) => productService.update(id, product),
  deleteProduct: (parent: any, { id }: { id: string }) => productService.delete(id),
}
