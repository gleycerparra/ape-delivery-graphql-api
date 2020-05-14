import { gql } from "apollo-server";

export const ProductQuery = gql`

extend type Query {
    """
    Returns all products.
    """
    products: [Product]
    """
    Returns a product.
    """
    product(id: ID!): Product
}`