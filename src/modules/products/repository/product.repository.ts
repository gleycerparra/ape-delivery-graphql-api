import { QueryParams } from '@app/helpers/queryParams';
import { IProductRepository } from './product.interface';
import { injectable } from 'inversify';
import { DocumentType, mongoose } from '@typegoose/typegoose';
import { ProductModel } from '../product.model';
import { Product } from '../product';
import { PageInfo } from '@app/helpers/pageInfo';
import { PageInfoMetadata } from '@app/core/interfaces/pageInfo.interface';
import { DocumentQuery } from 'mongoose';
@injectable()
export class ProductRepository implements IProductRepository {

    products: DocumentQuery<DocumentType<Product>[], DocumentType<Product>, {}>;

    async getAll(queryParams?: QueryParams<Product>): Promise<{ data: Product[], pageInfo: PageInfoMetadata | null }> {
        queryParams = new QueryParams(queryParams);
        let paginationMetadata: PageInfoMetadata | null = null;
        this.getProducts();

        if (queryParams.searchText) {
            this.products = this.products.find(
                queryParams.searchText
            );
        }

        const query = await this.makeQuery(queryParams);

        if (queryParams.paginate && typeof queryParams.skip !== undefined && queryParams.limit) {
            const pageInfo = new PageInfo(this.products, queryParams.skip, queryParams.limit);
            paginationMetadata = await pageInfo.getPageInfo();
        }

        return {
            data: [...query],
            pageInfo: paginationMetadata
        };
    }

    getProducts(): void {
        this.products = ProductModel.find({});
    }

    async makeQuery(queryParams: QueryParams<Product>) {
        return await this.products.find(
            queryParams.searchText,
        )
            .where('deletedAt').equals(null)
            .skip(queryParams.skip)
            .limit(queryParams.limit)
            .sort(queryParams.sort)
            .exec();
    }

    async get(id: string): Promise<DocumentType<Product> | null> {
        return ProductModel.findOne({ _id: mongoose.Types.ObjectId(id) })
            .where('deletedAt').equals(null)
            .exec();
    }

    add(product: Product): Promise<Product> {
        return ProductModel.create({ ...product });
    }

    update(id: string, product: Product): Promise<DocumentType<Product> | null> {
        return ProductModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, product, { new: true }).exec();
    }

    delete(id: string): any/*  Promise<DocumentType<Product> | null> */ {
        return ProductModel.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
            deletedAt: new Date()
        }).exec();
    }

}