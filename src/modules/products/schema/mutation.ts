import { gql } from "apollo-server";

export const ProductMutation = gql`

input ProductAttributeInput {
    """
    Product attribute name.
    """
    name: String!
    """
    Product attribute description.
    """
    description: String!
}

input ProductInput {
    """
    Product name.
    """
    name: String!
    """
    Product code.
    """
    code: String!
    """
    Product price.
    """
    price: Float!
    """
    Product images.
    """
    images: [String]!
    """
    Product isActive.
    """
    isActive: Boolean!
    """
    Product productAttributes.
    """
    productAttributes: [ProductAttributeInput!]!
    """
    Product warrantyTerms.
    """
    warrantyTerms: String
    """
    Product description.
    """
    description: String
}
  
extend type Mutation {
    """
    Create a product.
    """
    createProduct(input: ProductInput!): Product!
}`