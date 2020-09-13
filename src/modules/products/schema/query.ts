import { gql } from "apollo-server";

export const ProductQuery = gql`

type ProductConnection {
    data: [Product],
    pageInfo: PageInfo
}

type Query {
    """
    Returns all products.
    If you provide and invalid param such as (limit: 0, skip > total) the pagination will be ignored and might return null or an error.
    """
    products(
        searchText: SearchText,
        skip: Int,
        limit: Int,
        sort: JSON,
        ): ProductConnection
    """
    Returns a product.
    """
    product(id: ID!): Product
}
`