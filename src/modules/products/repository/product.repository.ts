import { QueryParams } from '../../../core/query-params';
import { IProductRepository } from './product.interface';
/* import { Product } from '../product'; */
import { injectable } from 'inversify';
import { DocumentType, mongoose } from '@typegoose/typegoose';
import { ProductModel } from '../product.model';
import { Product } from '../product';
@injectable()
export class ProductRepository implements IProductRepository {

    getAll(queryParams?: QueryParams<Product>): Promise<DocumentType<Product>[]> {
        queryParams = new QueryParams(queryParams);
        return ProductModel.find(
            queryParams.searchText
        )
            .skip(queryParams.skip)
            .limit(queryParams.limit)
            .exec();
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