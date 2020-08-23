import { Schema } from "mongoose";
import * as mongoose from 'mongoose';
import { Product } from "./interfaces/product";

const productSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    price: Number,
    sku: String,
    isActive: Boolean,
    description: {
        type: String,
        required: false
    },
    warrantyTerms: {
        type: String,
        required: false
    },
    deleteAt: {
        type: Date,
        default: null,
        required: false
    },
    productAttributes: [{
        name: String,
        position: Number
    }],
    images: [{
        url: String,
        description: String
    }]
});

export const ProductModel = mongoose.model<Product>('Product', productSchema);

