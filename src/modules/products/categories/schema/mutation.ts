import { gql } from 'apollo-server';

const CategoryMutation = gql`

    input CreateCategoryInput {
        sku: String!
        name: String!
        description: String!
        isActive: Boolean!
        parent: ID
    }

    input UpdateCategoryInput {
        sku: String!
        name: String!
        description: String!
        isActive: Boolean!
        parent: ID
    }

    extend type Mutation {
        createCategory(category: CreateCategoryInput!): Category!
        updateCategory(id: ID!, category: UpdateCategoryInput!): Category!
        deleteCategory(id: ID!): Category!
    }
`;

export default CategoryMutation;