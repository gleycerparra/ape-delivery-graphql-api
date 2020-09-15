import "reflect-metadata";
import { PageInfoService } from '@app/services/page-info.service';
import { QueryParamsService } from '@app/services/query-params.service';
import { clearDatabase, closeDatabase, connect } from '@app/in-memory-db.config';
import Category from '../interfaces/category.interface';
import CategoryRepository from './category.repository';
import { mocked } from 'ts-jest/utils';

jest.mock('@app/services/page-info.service');
jest.mock('@app/services/query-params.service');

const queryParamsService = mocked(QueryParamsService, true);
const pageInfoService = mocked(PageInfoService, true);

/* jest.mock('./query-params.mock'); */
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await closeDatabase());

const category = {
    sku: 'test',
    name: 'test',
    description: 'test',
    isActive: true
};

describe('Categories Repository', () => {
    it('should create category successfully', async () => {
        const categoryRepository = new CategoryRepository(queryParamsService as any, pageInfoService as any);
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
            sku: 'modifiedSku',
            name: 'modifiedName',
            description: 'modifiedDescription',
            isActive: false
        };
        const updatedCategory = await categoryRepository.update(addedCategory._id, updateCategory as Category);

        const retrievedCategory = await categoryRepository.get(updatedCategory._id);
        expect(retrievedCategory).toEqual(updatedCategory);
    });
});