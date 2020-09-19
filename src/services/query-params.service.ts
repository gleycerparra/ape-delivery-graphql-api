import { QueryParams, SearchText, Sort } from "@app/core/interfaces/query-params.interface";
import { injectable } from "inversify";

export interface IQueryParamsService<T> {
    skip: number;
    limit: number;
    sort: Sort<T>;
    searchText: SearchText<T> | any;
    getParams(queryParams?: QueryParams<T>): any;
    setTextSearch(fields: [keyof T], searchText: string): any;
}

@injectable()
export class QueryParamsService<T> implements IQueryParamsService<T>{
    skip: number;
    limit: number;
    sort: Sort<T>;
    searchText: SearchText<T> | any;

    getParams(queryParams?: QueryParams<T>) {
        return {
            skip: queryParams?.skip,
            limit: queryParams?.limit,
            sort: queryParams?.sort,
            searchText: queryParams?.searchText?.fields && queryParams?.searchText?.text ?
                this.setTextSearch(queryParams.searchText.fields, queryParams.searchText.text) : undefined
        };
    }

    setTextSearch(fields: [keyof T], searchText: string) {
        const query = [];

        for (const field of fields) {
            query.push({
                [field]: new RegExp(searchText, "gi")
            });
        }

        return {
            $or: query
        };
    }

}


