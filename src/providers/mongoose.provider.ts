import mongoose from 'mongoose';
import { environment } from '../environment';

export class MongooseProvider {

    static async connect() {
        try {
            await mongoose.connect(environment.mongoDb.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

        } catch {
            console.log('Connection error');
        }
    }

}