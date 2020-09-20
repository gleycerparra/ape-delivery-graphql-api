export interface QueryParams<T> {
    skip: number;
    limit: number;
    sort: Sort<T>;
    searchText: SearchText<T> | any;
}

export interface SearchText<T> {
    fields: [keyof T];
    text: string | any;
}

export type Sort<T> = {
    [K in keyof T]?: SortDirection;
};

enum SortDirection {
    asc = 1,
    desc = -1
}