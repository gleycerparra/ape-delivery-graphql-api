import * as mongoose from 'mongoose';
import ICategoryRepository from '@app/modules/products/categories/repository/category.interface';
import Category from '@app/modules/products/categories/interfaces/category.interface';
import { PageInfo } from '@app/helpers/page-info';
import { QueryParams } from '@app/helpers/query-params';
import { PageInfoMetadata } from '@app/core/interfaces/page-info.interface';
import { MongoDataSource } from 'apollo-datasource-mongodb';

class CategoryRepository extends MongoDataSource<Category> implements ICategoryRepository {
    categories: any;

    async getAll(queryParams?: QueryParams<Category>): Promise<{ data: Category[], pageInfo: PageInfoMetadata | null }> {
        queryParams = new QueryParams(queryParams);
        let paginationMetadata: PageInfoMetadata | null = null;

        let aggregate: any = [
            {
                $match: {
                    deletedAt: null,
                    parent: null,
                    ...queryParams.searchText
                },
            },
            {
                $graphLookup: {
                    from: 'categories',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'parent',
                    as: 'children'
                }
            },
        ];

        if (queryParams.limit && typeof queryParams.skip !== undefined) {
            aggregate = [
                ...aggregate,
                {
                    $skip: queryParams.skip
                },
                {
                    $limit: queryParams.limit
                }
            ];
        }

        if (queryParams.sort) {
            aggregate = [
                ...aggregate,
                {
                    $sort: queryParams.sort
                }
            ];
        }

        const query = await this.model.aggregate(aggregate).exec();

        if (typeof queryParams.skip !== undefined && queryParams.limit && query.length > 0) {
            const pageInfo = new PageInfo(await this.getTotal(queryParams.searchText), queryParams.skip, queryParams.limit);
            paginationMetadata = await pageInfo.getPageInfo();
        }

        return {
            data: [...query],
            pageInfo: paginationMetadata
        };
    }

    async getTotal(searchText: any): Promise<number> {
        return await this.model.find(
            { $and: [{ deletedAt: null }, { parent: null }] },
            searchText
        ).count()
    }

    async get(id: string) {
        return this.model.findOne({ _id: mongoose.Types.ObjectId(id) })
            .where('deletedAt').equals(null)
            .exec();
    }

    add(category: Category): Promise<mongoose.Document> {
        return this.model.create({ ...category });
    }

    update(id: string, category: Category): Promise<mongoose.Document> {
        return this.model.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, category, { new: true }).exec();
    }

    delete(id: string): Promise<mongoose.Document> {
        return this.model.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
            deletedAt: new Date(),
            isActive: false
        }).exec();
    }

}

export default CategoryRepository;