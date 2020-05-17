import { prop, arrayProp, index } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

class ProductAttribute {

    @prop()
    name: string;

    @prop()
    description?: string;
}
export class Product {

    @prop({ index: true })
    name: string;

    @prop()
    price: number;

    @prop({ index: true })
    code: string;

    @prop()
    images: string[];

    @prop()
    isActive: boolean;

    @prop()
    description?: string;

    @prop()
    warrantyTerms?: string;

    @arrayProp({ items: ProductAttribute, _id: false }) productAttributes: ProductAttribute[];
}


