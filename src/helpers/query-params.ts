export class QueryParams<T> {

    skip: number;
    limit: number;
    sort: Sort<T>;
    searchText: SearchText<T> | any;

    constructor(queryParams?: QueryParams<T>) {
        this.skip = queryParams?.skip;
        this.limit = queryParams?.limit;
        this.sort = queryParams?.sort;

        if (queryParams?.searchText?.fields && queryParams?.searchText?.text) {
           this.searchText = this.setTextSearch(queryParams.searchText.fields, queryParams.searchText.text);
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

interface SearchText<T> {
    fields: [keyof T];
    text: string | any;
}

type Sort<T> = {
    [K in keyof T]?: SortDirection;
};

enum SortDirection {
    asc = 1,
    desc = -1
}
