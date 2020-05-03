import { prop, getModelForClass } from '@typegoose/typegoose';

export class BookClass {
    @prop()
    title?: string;
    author?: string;
}

export const Book = getModelForClass(BookClass);