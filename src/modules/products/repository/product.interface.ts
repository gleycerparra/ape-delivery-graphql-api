import { IRepository } from '@app/core/repository.interface';
import { Product } from '../product';

export interface IProductRepository extends IRepository<Product> {}