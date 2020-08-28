import { QueryParams } from '@app/helpers/queryParams';
import Category from '../interfaces/category.interface';
import CategoryRepository from '../repository/category.repository';

const categoryRepository = new CategoryRepository();

const Query = {
    category: async (parent: any, { id }: { id: string }) => await categoryRepository.get(id),

    categories: async (parent: any, args: QueryParams<Category>) => {
        return await categoryRepository.getAll(args);
    }
}

export default Query;