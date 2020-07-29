import { gql } from "apollo-server";

export const ProductQuery = gql`

type ProductConnection {
    data: [Product],
    pageInfo: PageInfo
}

type Query {
    """
    Returns all products.
    """
    products(
        paginate: Boolean,
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