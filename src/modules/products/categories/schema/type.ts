import { gql } from 'apollo-server';

const CategoryType = gql`
    type Category {
        _id: ID!,
        sku: String!,
        name: String!,
        description: String!,
        isActive: Boolean!,
        parent: ID,
        children: [Category],
        createdAt: DateTime,
        updatedAt: DateTime,
        deletedAt: DateTime,
    }
`;

export default CategoryType;