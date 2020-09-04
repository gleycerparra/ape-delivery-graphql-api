import mongoose from "mongoose";

export default interface Category extends mongoose.Document {
    sku: string,
    name: string,
    description: string,
    isActive: boolean,
    deletedAt?: Date,
    subcategories?: [ISubcategory]
};

interface ISubcategory {
    sku: string,
    name: string,
    description: string,
    isActive: boolean
}
