import "reflect-metadata";
import { PageInfoService } from '@app/services/page-info.service';
import { QueryParamsService } from '@app/services/query-params.service';
import { clearDatabase, closeDatabase, connect } from '@app/in-memory-db.config';
import Category from '../interfaces/category.interface';
import CategoryRepository from './category.repository';
// tslint:disable-next-line: no-var-requires
const faker = require('faker');
import CategoryModel from '@app/modules/products/categories/category';

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const category = {
    sku: faker.random.number().toString(),
    name: faker.commerce.productName(),
    description: faker.commerce.product(),
    isActive: faker.random.boolean()
};

const categories = [];
let count = 4;
while (count >= 0) {
    categories.push({
        sku: faker.random.number().toString(),
        name: faker.commerce.productName(),
        description: faker.commerce.product(),
        isActive: faker.random.boolean()
    });
    count--;
}

describe('Categories Repository', () => {
    it('should create category successfully', async () => {
        const categoryRepository = new CategoryRepository();

        const addedCategory = await categoryRepository.add(category as Category);

        expect(addedCategory._id).toBeDefined();
    });

    it('should retrieve the correct category if id matches', async () => {
        const categoryRepository = new CategoryRepository();
        const addedCategory = await categoryRepository.add(category as Category);

        const retrievedCategory = await categoryRepository.get(addedCategory._id);

        expect(retrievedCategory._id).toEqual(addedCategory._id);
    });

    it('should update the given category if id matches', async () => {
        const categoryRepository = new CategoryRepository();
        const addedCategory = await categoryRepository.add(category as Category);
        const updateCategory = {
            sku: faker.random.number().toString(),
            name: faker.commerce.productName(),
            description: faker.commerce.product(),
            isActive: faker.random.boolean()
        };

        const updatedCategory = await categoryRepository.update(addedCategory._id, updateCategory as Category);
        const retrievedCategory = await categoryRepository.get(updatedCategory._id);

        expect(retrievedCategory).toEqual(updatedCategory);
    });

    describe('Category Repository -> getAll', () => {
        it('should retrieve all categories correctly', async () => {
            const categoryRepository = new CategoryRepository();
            await CategoryModel.insertMany(categories);

            const gettedCategories = await categoryRepository.getAll();

            expect(gettedCategories.data).toHaveLength(5);
        });
        it('should retrieve correct children if that propery exist in a category', async () => {
            const categoryRepository = new CategoryRepository();

        });
        it('should retrieve correct pageInfo', async () => {
            const queryParamsService = new QueryParamsService();
            const pageInfoService = new PageInfoService();
            const categoryRepository = new CategoryRepository(queryParamsService, pageInfoService);
            await CategoryModel.insertMany(categories);

            const gettedCategories = await categoryRepository.getAll({
                skip: 1,
                limit: 1,
                sort: undefined,
                searchText: undefined
            });

            expect(gettedCategories.pageInfo).toEqual({
                from: 2,
                to: 2,
                total: 5,
                hasNextPage: true,
                hasPreviousPage: true
            });
        });
    });
});