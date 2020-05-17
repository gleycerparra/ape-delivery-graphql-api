export class QueryParams<T> {

    skip: number;
    limit: number;
    fields: [keyof T];
    searchText: string | any;

    constructor(queryParams?: QueryParams<T>) {
        this.skip = queryParams?.skip || 0;
        this.limit = queryParams?.limit || 25;

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

        console.log(query);

        return {
            $or: query
        }
    }
}