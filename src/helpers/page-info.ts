import { PageInfoMetadata } from "@app/core/interfaces/page-info.interface";

export class PageInfo {

    total: number;
    skip: number;
    limit: number;

    constructor(total: number, skip: number, limit: number) {
        this.total = total;
        this.skip = skip;
        this.limit = limit;
    }

    async getPageInfo(): Promise<PageInfoMetadata> {

        return {
            from: (this.skip === 0 && this.total > 0) ? 1 : this.skip + 1,
            to: this.skip + this.limit < this.total ? this.skip + this.limit : this.total,
            total: this.total,
            hasNextPage: this.limit + this.skip < this.total,
            hasPreviousPage: this.limit + this.skip > this.limit
        }
    }

}

