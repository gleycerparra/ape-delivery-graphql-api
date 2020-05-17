import { gql } from "apollo-server";

export const ProductQuery = gql`

extend type Query {
    """
    Returns all products.
    """
    products(
        searchText: String, 
        skip: Int, 
        limit: Int,
        fields: [String]
        ): [Product]
    """
    Returns a product.
    """
    product(id: ID!): Product
}`