import { Product } from '../product';
import { FormatQueryParams } from '@app/helpers/formatQueryParams';
import { ProductRepository } from '../repository/product.repository';

const productRepository = new ProductRepository();

/* let productService = container.get<ProductService>(RepositoryTypes.IProductRepository); */

export const Query = {
    product: async (parent: any, { id }: { id: string }) => await productRepository.get(id),
    products: async (parent: any, args: FormatQueryParams<Product>) => {
        return await productRepository.getAll(args);
    },
}
