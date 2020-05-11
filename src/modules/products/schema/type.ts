import { gql } from "apollo-server";

export const ProductType = gql`

type Product {
    name: String!
    price: Float!
    code: String!
    images: [String]!
    isActive: Boolean!
    productAttributes: [ProductAttribute]!
    warrantyTerms: String
    description: String
}

interface ProductAttribute {
    id: ID!
    name: String!
    description: String
}`