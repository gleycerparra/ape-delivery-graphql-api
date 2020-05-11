import { getModelForClass } from "@typegoose/typegoose";
import { Product } from "./product";

export const ProductModel = getModelForClass(Product);