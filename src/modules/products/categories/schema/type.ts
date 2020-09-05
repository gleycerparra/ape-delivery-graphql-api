import { gql } from 'apollo-server';

const CategoryType = gql`
    type Category {
        _id: String,
        sku: String!,
        name: String!,
        description: String!,
        isActive: Boolean!,
        subcategories: [Subcategories],
        createdAt: DateTime,
        updatedAt: DateTime,
        deletedAt: DateTime,
    }

    type Subcategories {
        sku: String!,
        name: String!
        description: String!,
        isActive: Boolean!,
    }
`;

export default CategoryType;