import { IProductRepository } from "./product.interface";
import { Product } from "../product";
import { ProductModel } from "../product.model";
import { injectable } from "inversify";
import { DocumentType, mongoose } from "@typegoose/typegoose";

@injectable()
export class ProductRepository implements IProductRepository {

    getAll(): Promise<DocumentType<Product>[]> {
        return ProductModel.find({}).exec();
    }

    async get(id: string): Promise<DocumentType<Product> | null> {
        return ProductModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
    }

    add(product: Product): Promise<Product> {
        return ProductModel.create({ ...product });
    }

    update(id: string, product: Product): Promise<DocumentType<Product> | null> {
        return ProductModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, product, { new: true }).exec();
    }

    delete(id: string): Promise<DocumentType<Product> | null> {
        return ProductModel.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) }).exec();
    }


}