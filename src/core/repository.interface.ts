import { PageInfoMetadata } from "./interfaces/pageInfo.interface";
import * as mongoose from 'mongoose';
export interface IRepository<T> {
    add(t: T);
    get(id: string): Promise<mongoose.Document>;
    getAll(): Promise<{ data: T[], pageInfo: PageInfoMetadata | null}>
    update(id: string, t: T): Promise<mongoose.Document>;
    delete(id: string): Promise<mongoose.Document>;
}