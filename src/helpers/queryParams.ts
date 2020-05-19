export class QueryParams<T> {

    skip: number;
    limit: number;
    sort: Sort<T>;
    fields: [keyof T];
    searchText: string | any;
    paginate: boolean;

    constructor(queryParams?: QueryParams<T>) {
        this.skip = queryParams?.skip || 0;
        this.limit = queryParams?.limit || 25;
        this.sort = queryParams?.sort || {};
        this.paginate = queryParams?.paginate || true;

        if (queryParams?.fields && queryParams.searchText) {
           this.searchText = this.setTextSearch(queryParams.fields, queryParams.searchText);
        }
    }

    private setTextSearch(fields: [keyof T], searchText: string) {
        const query = [];

        for (const field of fields) {
            query.push({
                [field]: new RegExp(searchText, "gi")
            })
        }

        return {
            $or: query
        }
    }

}
type Sort<T> = {
    [K in keyof T]?: SortDirection;
};

enum SortDirection {
    asc = 1,
    desc = -1
}
