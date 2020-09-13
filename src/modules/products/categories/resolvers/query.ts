import { QueryParams } from '@app/helpers/query-params';
import Category from '../interfaces/category.interface';

const Query = {
    category: async (_, { id }: { id: string }, { dataSources: { productCategories } }) => await productCategories.get(id),

    categories: async (_, args: QueryParams<Category>, { dataSources: { productCategories } }) => {
        return await productCategories.getAll(new QueryParams(args));
    }
}

export default Query;