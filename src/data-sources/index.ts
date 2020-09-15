import { ProductModel } from "@app/modules/products/product";
import { ProductRepository } from "@app/modules/products/repository/product.repository";
import CategoryRepository from "@app/modules/products/categories/repository/category.repository";

export const dataSources = {
    products: new ProductRepository(ProductModel),
    productCategories: new CategoryRepository()
};

