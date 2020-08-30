import Category from '../interfaces/category.interface';
import CategoryRepository from '../repository/category.repository';


export const Mutation = {
    createCategory: async (_, { category }: { category: Category }, { dataSources: { productCategories } }) => await productCategories.add(category),

    updateCategory: async (_, { id, category }: { category: Category, id: string }, { dataSources: { productCategories } }) => await productCategories.update(id, category),

    deleteCategory: async (_, { id }: { id: string }, { dataSources: { productCategories } }) => await productCategories.delete(id)
}

export default Mutation;