import * as mongoose from 'mongoose';
import { environment } from '../environment';

export class MongooseProvider {

    static async connect() {
        try {
            const connection = await mongoose.connect(environment.mongoDb.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })

            if (connection) {
                console.log(`🐘 Connected to MongoDB`);
            }

        } catch (error) {
            console.log('Connection error');
            console.log(error);
        }
    }

}