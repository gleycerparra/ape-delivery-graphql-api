import { gql } from "apollo-server";

export const ProductMutation = gql`

input CreateProductInput {
    """
    Product name.
    """
    name: String!
    """
    Product code.
    """
    code: String!
  }
  
type Mutation {
    """
    Create a product.
    """
    createProduct(input: CreateProductInput!): Product!
}`