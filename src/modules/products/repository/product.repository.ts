import "reflect-metadata";
import { QueryParams } from '@app/helpers/query-params';
import { IProductRepository } from './product.interface';
import * as mongoose from 'mongoose';
import { PageInfo } from '@app/helpers/page-info';
import { PageInfoMetadata } from '@app/core/interfaces/page-info.interface';
import { Product } from '../interfaces/product';
import { MongoDataSource } from 'apollo-datasource-mongodb';

export class ProductRepository extends MongoDataSource<Product> implements IProductRepository {

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
            const pageInfo = new PageInfo(await this.products.countDocuments().exec(), queryParams.skip, queryParams.limit);
            paginationMetadata = await pageInfo.getPageInfo();
        }

        const query = await this.makeQuery(queryParams);

        return {
            data: [...query],
            pageInfo: paginationMetadata
        };
    }

    getProducts(): void {
        this.products = this.model.find({});
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
        return this.model.findOne({ _id: mongoose.Types.ObjectId(id) })
            .where('deletedAt').equals(null)
            .exec();
    }

    add(product: Product): Promise<mongoose.Document> {
        return this.model.create({ ...product });
    }

    update(id: string, product: Product): Promise<mongoose.Document> {
        return this.model.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, product, { new: true }).exec();
    }

    delete(id: string): Promise<mongoose.Document> {
        return this.model.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
            deletedAt: new Date()
        }).exec();
    }

}