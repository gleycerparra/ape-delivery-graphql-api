export interface IRepository<T> {
    add(t: T): Promise<T>;
    exists(t: T): Promise<boolean>;
    delete(t: T): Promise<any>;
    getById(id: string): Promise<T>;
}