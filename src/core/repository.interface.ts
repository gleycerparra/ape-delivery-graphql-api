import { DocumentType } from "@typegoose/typegoose";
import { PageInfoMetadata } from "./interfaces/pageInfo.interface";

export interface IRepository<T> {
    add(t: T): Promise<T>;
    get(id: string): Promise<DocumentType<T> | null>;
    getAll(): Promise<{ data: T[], pageInfo: PageInfoMetadata | null}>
    update(id: string, t: T): Promise<DocumentType<T> | null>;
    delete(id: string): Promise<DocumentType<T> | null>;
}