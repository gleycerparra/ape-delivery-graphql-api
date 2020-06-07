import { prop, arrayProp } from '@typegoose/typegoose';

class ProductAttribute {

    @prop()
    name: string;

    @prop()
    position: number;
}
class ProductImage {

    @prop()
    url: string;

    @prop()
    description: string;
}
export class Product {

    @prop({ index: true, required: true })
    name: string;

    @prop({ required: true })
    price: number;

    @prop({ index: true, required: true })
    sku: string;

    @prop({ required: true })
    isActive: boolean;

    @prop({ required: true })
    description?: string;

    @prop()
    warrantyTerms?: string;

    @prop({ default: null })
    deletedAt?: Date;

    @arrayProp({ items: ProductAttribute, _id: false }) productAttributes: ProductAttribute[];

    @arrayProp({ items: ProductImage, _id: false }) images: ProductImage[];
}


