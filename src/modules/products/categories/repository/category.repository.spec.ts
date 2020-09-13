import mongoose from 'mongoose';
import CategoryModel from '../category';
import CategoryRepository from './category.repository';

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
    beforeAll(async () => {
        connection = await mongoose.connect(process.env.MONGO_URL, { // <= MONGO_URL env var set
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        db = await connection.db(); // <= env var (presumably) includes the db so no longer need to pass this
    });

    afterAll(async () => {
        await connection.close();
    });

   /*  it('create category successfully', async () => {
        const categoryRepository = new CategoryRepository(CategoryModel);
        const addedCategory = await categoryRepository.add(category as any);
        // Object Id should be defined when successfully saved to MongoDB.
        expect(addedCategory._id).toBeDefined();
    }); */
})