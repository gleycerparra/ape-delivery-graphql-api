import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import Category from './interfaces/category.interface';

const categorySchema = new Schema({
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
        required: true,
        index: false
    },
    isActive: {
        type: Boolean,
        required: false,
        index: false
    },
    deletedAt: {
        type: Date,
        default: null,
        required: false
    },
    subcategories: [{
        sku: String,
        name: String,
        description: String,
        isActive: Boolean
    }]
});

const CategoryModel = mongoose.model<Category>('Category', categorySchema);

export default CategoryModel;