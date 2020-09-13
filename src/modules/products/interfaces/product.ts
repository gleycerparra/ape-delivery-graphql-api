import mongoose from "mongoose";

export interface Product extends mongoose.Document {
    name: string;
    price: number;
    sku: string;
    isActive: boolean;
    description?: string;
    warrantyTerms?: string;
    deletedAt?: Date;
    productAttributes: IProductAttribute[];
    categories: any;
    images: IProductImage[];
}

interface Category extends mongoose.Document {
    id: string,
    sku?: string,
    name?: string,
    description?: string,
    isActive?: boolean,
    parent?: string,
    deletedAt?: Date,
    children?: [Category]
};


interface IProductAttribute {
    name: string;
    position: number;
}
interface IProductImage {
    url: string;
    description: string;
}