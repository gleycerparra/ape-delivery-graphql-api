import Category from '../interfaces/category.interface';
import CategoryRepository from '../repository/category.repository';

const categoryRepository = new CategoryRepository();

export const Mutation = {
    createCategory: async (parent: any, { category }: { category: Category }) => await categoryRepository.add(category),
    
    updateCategory: async (parent: any, { id, category }: { category: Category, id: string }) => await categoryRepository.update(id, category),
  
    deleteCategory: async (parent: any, { id }: { id: string }) => await categoryRepository.delete(id)
}

export default Mutation;