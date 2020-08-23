import { IRepository } from '@app/core/repository.interface';
import { Product } from '@app/modules/products/interfaces/product';

export interface IProductRepository extends IRepository<Product> {}