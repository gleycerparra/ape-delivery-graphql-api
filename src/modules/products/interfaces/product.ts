import mongoose from "mongoose";

export interface Product extends mongoose.Document{
    name: string;
    price: number;
    sku: string;
    isActive: boolean;
    description?: string;
    warrantyTerms?: string;
    deletedAt?: Date;
    productAttributes: IProductAttribute[];
    images: IProductImage[];
  }
  
  interface IProductAttribute {
    name: string;
    position: number;
  }
  interface IProductImage {
    url: string;
    description: string;
  }
  