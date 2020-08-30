import { PageInfoMetadata } from "@app/core/interfaces/page-info.interface";

export class PageInfo {

    query: any;
    skip: number;
    limit: number;

    constructor(query: any, skip: number, limit: number) {
        this.query = query;
        this.skip = skip;
        this.limit = limit;
    }

    async getPageInfo(): Promise<PageInfoMetadata> {

        const total = await this.query.countDocuments().exec();

        return {
            from: (this.skip === 0 && total > 0) ? 1 : this.skip,
            to: this.skip + this.limit < total ? this.skip + this.limit : total,
            total,
            hasNextPage: this.limit + this.skip < total,
            hasPreviousPage: this.limit + this.skip > this.limit
        }
    }

}

