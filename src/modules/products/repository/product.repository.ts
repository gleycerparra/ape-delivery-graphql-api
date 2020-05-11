import { IProductRepository } from "./product.interface";
import { Product } from "../product";
import { ProductModel } from "../product.model";
import { injectable } from "inversify";

@injectable()
export class ProductRepository implements IProductRepository {

    add(product: Product): Promise<Product> {
           return ProductModel.create({...product});
    }
    exists(t: Product): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: Product): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
}