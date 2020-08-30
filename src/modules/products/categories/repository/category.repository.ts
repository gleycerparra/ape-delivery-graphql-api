import * as mongoose from 'mongoose';
import ICategoryRepository from '@app/modules/products/categories/repository/category.interface';
import Category from '@app/modules/products/categories/interfaces/category.interface';
import CategoryModel from '@app/modules/products/categories/category';
import { PageInfo } from '@app/helpers/page-info';
import { QueryParams } from '@app/helpers/query-params';
import { PageInfoMetadata } from '@app/core/interfaces/page-info.interface';

class CategoryRepository implements ICategoryRepository {
    categories:any;

    async getAll(queryParams?: QueryParams<Category>): Promise<{ data: Category[], pageInfo: PageInfoMetadata | null }> {
        queryParams = new QueryParams(queryParams);
        let paginationMetadata: PageInfoMetadata | null = null;
        this.getCategories();

        if (queryParams.searchText) {
            this.categories = this.categories.find(
                queryParams.searchText
            );
        }

        if (typeof queryParams.skip !== undefined && typeof queryParams.limit !== undefined) {
            const pageInfo = new PageInfo(this.categories, queryParams.skip, queryParams.limit);
            paginationMetadata = await pageInfo.getPageInfo();
        }

        const query = await this.makeQuery(queryParams);

        return {
            data: [...query],
            pageInfo: paginationMetadata
        };
    }

    getCategories(): void {
        this.categories = CategoryModel.find({});
    }

    async makeQuery(queryParams: QueryParams<Category>) {
        return await this.categories.find(
            queryParams.searchText,
        )
            .where('deletedAt').equals(null)
            .skip(queryParams.skip)
            .limit(queryParams.limit)
            .sort(queryParams.sort)
            .exec();
    }

    async get(id: string) {
        return CategoryModel.findOne({ _id: mongoose.Types.ObjectId(id) })
            .where('deletedAt').equals(null)
            .exec();
    }

    add(category: Category): Promise<mongoose.Document> {
        return CategoryModel.create({ ...category });
    }

    update(id: string, category: Category): Promise<mongoose.Document> {
        return CategoryModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, category, { new: true }).exec();
    }

    delete(id: string): Promise<mongoose.Document> {
        return CategoryModel.findByIdAndUpdate(mongoose.Types.ObjectId(id), {
            deletedAt: new Date(),
            isActive: false
        }).exec();
    }

}

export default CategoryRepository;