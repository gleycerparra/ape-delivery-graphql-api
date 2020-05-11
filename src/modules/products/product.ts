import { prop, Ref, mongoose } from '@typegoose/typegoose';

class ProductAttributes {
    @prop()
    _id: mongoose.Types.ObjectId;

    @prop()
    name: string;

    @prop()
    description?: string;
}

export class Product {
    @prop()
    _id: mongoose.Types.ObjectId;

    @prop()
    name: string;

    @prop()
    price: number;

    @prop()
    code: string;

    @prop()
    images: string[];

    @prop()
    isActive: boolean;

    @prop()
    description?: string;

    @prop()
    warrantyTerms?: string;

    @prop({ ref: ProductAttributes })
    productAttributes?: Ref<ProductAttributes[]>;
}


