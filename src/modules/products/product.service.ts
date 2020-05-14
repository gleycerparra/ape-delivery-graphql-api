import { ObjectID } from 'mongodb';
import { ProductRepository } from './repository/product.repository';
import { Product } from './product';
import { inject } from 'inversify';
import RepositoryTypes from '@app/core/repository.types';

export class ProductService {
    
    constructor(@inject(RepositoryTypes.IProductRepository) private productRepository: ProductRepository) {}

    add(product: Product) {
        return this.productRepository.add(product);
    }

    update(id: string, product: Product) {
        return this.productRepository.update(id, product);
    }

    delete(id: string) {
        return this.productRepository.delete(id);
    }

    get(id: string) {
        return this.productRepository.get(id);
    }

    getAll() {
        return this.productRepository.getAll();
    }
}