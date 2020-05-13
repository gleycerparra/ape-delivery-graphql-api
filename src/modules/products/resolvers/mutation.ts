
import { Product } from '../product';
import { container } from '../../../inversify.config';
import { ProductService } from '../product.service';
import RepositoryTypes from '../../../core/repository.types'

let productService = container.get<ProductService>(RepositoryTypes.IProductRepository);

export const Mutation = {
  createProduct: async (parent: any, { input }: { input: Product }
  ) => {
    return productService.add(input);
  },
  
}
