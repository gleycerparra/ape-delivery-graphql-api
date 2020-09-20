import { ProductRepository } from "@app/modules/products/repository/product.repository";
import CategoryRepository from "@app/modules/products/categories/repository/category.repository";

export const dataSources = {
    products: new ProductRepository(),
    productCategories: new CategoryRepository()
};

