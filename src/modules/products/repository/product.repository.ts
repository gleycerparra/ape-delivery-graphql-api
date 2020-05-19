import { FormatQueryParams } from '@app/helpers/formatQueryParams';
import { IProductRepository } from './product.interface';
/* import { Product } from '../product'; */
import { injectable } from 'inversify';
import { DocumentType, mongoose } from '@typegoose/typegoose';
import { ProductModel } from '../product.model';
import { Product } from '../product';
import { getPaginationMetadata } from '@app/helpers/getPaginationMetadata';
@injectable()
export class ProductRepository implements IProductRepository {

    async getAll(queryParams?: FormatQueryParams<Product>): Promise<DocumentType<any>> {
        queryParams = new FormatQueryParams(queryParams);
        let paginationMetadata = {};
        let products = ProductModel.find({});

        if (queryParams.searchText) {
            products = products.find(
                queryParams.searchText
            );
        }

        if (queryParams.paginate && queryParams.skip && queryParams.limit) {
            paginationMetadata = await getPaginationMetadata(products, queryParams.skip, queryParams.limit);
        }

        const query = await products.find(
            queryParams.searchText
        )
            .skip(queryParams.skip)
            .limit(queryParams.limit)
            .sort(queryParams.sort)
            .exec();

        return {
            data: [...query],
            pageInfo: { ...paginationMetadata }
        };
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