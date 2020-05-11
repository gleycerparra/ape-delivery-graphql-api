import { gql } from "apollo-server";

export const ProductQuery = gql`

type Query {
    """
    Returns all products.
    """
    products: [Product]
}`