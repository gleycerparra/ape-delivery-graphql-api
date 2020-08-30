import { QueryParams } from '@app/helpers/query-params';
import { IProductRepository } from './product.interface';
import * as mongoose from 'mongoose';
import { PageInfo } from '@app/helpers/page-info';
import { PageInfoMetadata } from '@app/core/interfaces/page-info.interface';
import { ProductModel } from '../product';
import { Product } from '../interfaces/product';
import { injectable, inject } from "inversify";
import "reflect-metadata";
@injectable()
export class ProductRepository implements IProductRepository {

    products;

    async getAll(queryParams?: QueryParams<Product>): Promise<{ data: Product[], pageInfo: PageInfoMetadata | null }> {
        queryParams = new QueryParams(queryParams);
        let paginationMetadata: PageInfoMetadata | null = null;
        this.getProducts();

        if (queryParams.searchText) {
            this.products = this.products.find(
                queryParams.searchText
            );
        }

        if (typeof queryParams.skip !== undefined && typeof queryParams.limit !== undefined) {
            const pageInfo = new PageInfo(this.products, queryParams.skip, queryParams.limit);
            paginationMetadata = await pageInfo.getPageInfo();
        }

        const query = await this.makeQuery(queryParams);

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

    async get(id: string) {
        return ProductModel.findOne({ _id: mongoose.Types.ObjectId(id) })
            .where('deletedAt').equals(null)
            .exec();
    }

    add(product: Product): Promise<mongoose.Document> {
        return ProductModel.create({ ...product });
    }

    update(id: string, product: Product): Promise<mongoose.Document> {
        return ProductModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, product, { new: true }).exec();
    }

    delete(id: string): Promise<mongoose.Document> {
        return ProductModel.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
            deletedAt: new Date()
        }).exec();
    }

}