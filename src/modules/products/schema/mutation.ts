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

input ProductImageInput {
    """
    Product attribute name.
    """
    url: String!
    """
    Product attribute description.
    """
    position: Float!
}

input CreateProductInput {
    """
    Product name.
    """
    name: String!
    """
    Product sku.
    """
    sku: String!
    """
    Product price.
    """
    price: Float!
    """
    Product images.
    """
    images: [ProductImageInput]!
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

input UpdateProductInput {
    """
    Product name.
    """
    name: String
    """
    Product sku.
    """
    sku: String
    """
    Product price.
    """
    price: Float
    """
    Product images.
    """
    images: [ProductImageInput]
    """
    Product isActive.
    """
    isActive: Boolean
    """
    Product productAttributes.
    """
    productAttributes: [ProductAttributeInput]
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
    createProduct(product: CreateProductInput!): Product!
    """
    Update a product.
    """
    updateProduct(id: ID!, product: UpdateProductInput!): Product!
    """
    delete a product.
    """
    deleteProduct(id: ID!): Product!
}`