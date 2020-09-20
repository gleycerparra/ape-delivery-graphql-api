import NotFoundExeception from '@app/exceptions/not-found.exception';
import { clearDatabase, closeDatabase, connect } from '@app/in-memory-db.config';
import { ProductRepository } from './product.repository';
import { Product } from '../interfaces/product';
import * as mongoose from 'mongoose';
import * as faker from 'faker';
jest.mock('@app/exceptions/not-found.exception');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const product: Product = {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    sku: faker.random.number().toString(),
    isActive: faker.random.boolean(),
    description: faker.commerce.product(),
    warrantyTerms: faker.random.words(),
    productAttributes: [
        {
            name: faker.commerce.productMaterial(),
            description: faker.commerce.product()
        }
    ],
    categories: [mongoose.Types.ObjectId()],
    images: [
        {
            url: faker.image.imageUrl(),
            position: faker.random.number(4)
        }
    ]
} as Product;

describe('Categories Repository', () => {
    it('should return an exception when a category that does not exist is given', async () => {
        const categoryRepository = new ProductRepository();

        await categoryRepository.add(product);

        expect(NotFoundExeception).toHaveBeenCalledTimes(1);
    });

    /*     it('should create a category successfully', async () => {
            const categoryRepository = new ProductRepository();

            const addedCategory = await categoryRepository.add(category as Category);

            expect(addedCategory._id).toBeDefined();
        }); */
});
