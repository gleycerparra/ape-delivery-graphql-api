import { Schema } from "mongoose";
import * as mongoose from 'mongoose';
import { Product } from "./interfaces/product";
import { ObjectId } from "mongodb";

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
    categories: [{
        _id: {
            type: ObjectId,
            required: true
        },
        sku: {
            type: String,
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true
        },
        parent: {
            type: ObjectId,
            required: false
        },
        isActive: {
            type: Boolean,
            required: false
        },
    }],
    images: [{
        url: String,
        description: String
    }]
}, { timestamps: true });

export const ProductModel = mongoose.model<Product>('Product', productSchema);

