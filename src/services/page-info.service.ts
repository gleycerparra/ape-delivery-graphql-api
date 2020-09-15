import { PageInfoMetadata } from "@app/core/interfaces/page-info.interface";
import { injectable } from "inversify";

export interface IPageInfoService {
    getPageInfo: (total: number, skip: number, limit: number) => Promise<PageInfoMetadata>;
}

@injectable()
export class PageInfoService implements IPageInfoService {

    async getPageInfo(total: number, skip: number, limit: number): Promise<PageInfoMetadata> {

        return {
            from: (skip === 0 && total > 0) ? 1 : skip + 1,
            to: skip + limit < total ? skip + limit : total,
            total,
            hasNextPage: limit + skip < total,
            hasPreviousPage: limit + skip > limit
        };
    }

}

