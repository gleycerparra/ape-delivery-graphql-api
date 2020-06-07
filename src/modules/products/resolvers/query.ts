import { Product } from '../product';
import { QueryParams } from '@app/helpers/queryParams';
import { ProductRepository } from '../repository/product.repository';

const productRepository = new ProductRepository();

/* let productService = container.get<ProductService>(RepositoryTypes.IProductRepository); */

export const Query = {
    getProduct: async (parent: any, { id }: { id: string }) => await productRepository.get(id),
    getProducts: async (parent: any, args: QueryParams<Product>) => {
        return await productRepository.getAll(args);
    },
}
