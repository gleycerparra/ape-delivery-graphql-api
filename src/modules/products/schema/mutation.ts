import { gql } from "apollo-server";

export const ProductMutation = gql`

input ProductAttributeInput {
    name: String!
    description: String!
}

input ProductImageInput {
    url: String!
    position: Float!
}

input CategoryInput {
    _id: ID!
}

input CreateProductInput {
    name: String!
    sku: String!
    price: Float!
    images: [ProductImageInput]!
    isActive: Boolean!
    productAttributes: [ProductAttributeInput!]!
    categories: [ObjectID!]!
    warrantyTerms: String
    description: String
}

input UpdateProductInput {
    name: String
    sku: String
    price: Float
    images: [ProductImageInput]
    isActive: Boolean
    productAttributes: [ProductAttributeInput]
    categories: [String!]
    warrantyTerms: String
    description: String
}

extend type Mutation {
    createProduct(product: CreateProductInput!): Product!
    updateProduct(id: ID!, product: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Product!
}`