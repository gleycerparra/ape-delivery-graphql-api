import { QueryParams } from '@app/helpers/query-params';
import { ProductRepository } from '../repository/product.repository';
import { Product } from '../interfaces/product';

const productRepository = new ProductRepository();

/* let productService = container.get<ProductService>(RepositoryTypes.IProductRepository); */

export const Query = {
    product: async (parent: any, { id }: { id: string }) => await productRepository.get(id),
    products: async (parent: any, args: QueryParams<Product>) => {
        console.log(await productRepository.getAll(args));
        return await productRepository.getAll(args);
    },
}
