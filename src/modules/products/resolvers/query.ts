import { QueryParams } from '../../../core/query-params';
import { ProductRepository } from './../repository/product.repository';
import { Product } from '../product';

const productRepository = new ProductRepository();

/* let productService = container.get<ProductService>(RepositoryTypes.IProductRepository); */

export const Query = {
    product: async (parent: any, { id }: { id: string }) => await productRepository.get(id),
    products: async (parent: any, args: QueryParams<Product>) => {
        return await productRepository.getAll(args)
    },
}
