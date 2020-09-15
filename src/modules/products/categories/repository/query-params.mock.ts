import { QueryParamsService } from "@app/services/query-params.service";

const mock = jest.createMockFromModule(typeof QueryParamsService);
/* getParams(queryParams?: QueryParams<T>) {
    return {
        skip: queryParams?.skip,
        limit: queryParams?.limit,
        sort: queryParams?.sort,
        searchText: queryParams?.searchText?.fields && queryParams?.searchText?.text ?
            this.setTextSearch(queryParams.searchText.fields, queryParams.searchText.text) : undefined
    }
} */
export default mock;