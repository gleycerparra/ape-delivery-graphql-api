import { IRepository } from '@app/core/repository.interface';
import ICategory from '@app/modules/products/categories/interfaces/category.interface';

export default interface ICategoryRepository extends IRepository<ICategory> {}