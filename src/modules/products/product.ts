import { prop, arrayProp } from '@typegoose/typegoose';

class ProductAttribute {

    @prop()
    name: string;

    @prop()
    description?: string;
}

export class Product {

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

    @arrayProp({ items: ProductAttribute, _id: false }) productAttributes: ProductAttribute[];
}


