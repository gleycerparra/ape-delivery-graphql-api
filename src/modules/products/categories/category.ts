import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import Category from './interfaces/category.interface';
import { ObjectId } from "mongodb";

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
    deletedAt: {
        type: Date,
        default: null,
        required: false
    },
});

const CategoryModel = mongoose.model<Category>('Category', categorySchema);

export default CategoryModel;