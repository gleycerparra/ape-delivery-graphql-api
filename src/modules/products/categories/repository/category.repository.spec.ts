import { clearDatabase, closeDatabase, connect } from '../../../../in-memory-db.config';
import CategoryModel from '../category';
import CategoryRepository from './category.repository';

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
    let connection;
    let db;
    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect

    it('create category successfully', async () => {
        const categoryRepository = new CategoryRepository(CategoryModel);
        const addedCategory = await categoryRepository.add(category as any);
        // Object Id should be defined when successfully saved to MongoDB.
        expect(addedCategory._id).toBeDefined();
    });
})