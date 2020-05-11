import { ProductRepository } from './repository/product.repository';
import { Product } from './product';
import RepositoryTypes from '@app/core/repository.types';
import { inject } from 'inversify';


export class ProductService {
    
    constructor(@inject(RepositoryTypes.IProductRepository) private productRepository: ProductRepository) {
    }

    async add(product: Product) {
        this.productRepository.add(product);
    }

}