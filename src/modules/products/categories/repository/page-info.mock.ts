import { PageInfoService } from "@app/services/page-info.service";

const mock = jest.createMockFromModule(typeof PageInfoService);
const getParams = () => '';
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