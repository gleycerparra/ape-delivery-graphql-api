import { container } from '../../../inversify.config';
import { ProductService } from '../product.service';
import RepositoryTypes from '../../../core/repository.types'

let productService = container.get<ProductService>(RepositoryTypes.IProductRepository);

export const Query = {
    product: async (parent: any, { id }: { id: string }) => await productService.get(id),
    products: async () => await productService.getAll(),
}
