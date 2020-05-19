export async function getPaginationMetadata(query: any, skip: number, limit: number): Promise<PaginationMetadata> {
    const total = await query.countDocuments().exec();
    const hasNextPage = limit + skip < total;
    const hasPreviousPage = limit + skip > limit;

    return {
        from: skip === 0 ? 1 : skip,
        to: skip + limit < total ? skip + limit : total,
        total,
        hasNextPage,
        hasPreviousPage
    }
}

interface PaginationMetadata {
    from: number;
    to: number;
    total: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}