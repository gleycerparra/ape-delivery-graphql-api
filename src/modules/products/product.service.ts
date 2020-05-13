import { ProductRepository } from './repository/product.repository';
import { Product } from './product';
import { inject } from 'inversify';
import RepositoryTypes from '@app/core/repository.types';

export class ProductService {
    
    constructor(@inject(RepositoryTypes.IProductRepository) private productRepository: ProductRepository) {
    }

    async add(product: Product) {
        this.productRepository.add(product);
    }

}