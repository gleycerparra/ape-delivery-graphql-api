import mongoose from "mongoose";

export default interface Category extends mongoose.Document {
    sku: string,
    name: string,
    description: string,
    isActive: boolean,
    parent: string,
    deletedAt?: Date,
    children?: [Category]
};
