import { DocumentType } from "@typegoose/typegoose";

export interface IRepository<T> {
    add(t: T): Promise<T>;
    get(id: string): Promise<DocumentType<T> | null>;
    getAll(): Promise<DocumentType<T>[]>;
    update(id: string, t: T): Promise<DocumentType<T> | null>;
    delete(id: string): Promise<DocumentType<T> | null>;
}