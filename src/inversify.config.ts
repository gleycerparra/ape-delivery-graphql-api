
import "reflect-metadata";
import { Container } from 'inversify';
import { RepositoryTypes } from './core/repository.types';
import { ProductRepository } from './modules/products/repository/product.repository';
import { IProductRepository } from './modules/products/repository/product.interface';

const container = new Container();
container.bind<IProductRepository>(RepositoryTypes.IProductRepository).to(ProductRepository);

export { container };