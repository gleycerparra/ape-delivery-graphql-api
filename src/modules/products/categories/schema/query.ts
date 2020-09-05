import { gql } from 'apollo-server';

const CategoryQuery = gql`
    type CategoryConnection {
        data: [Category],
        pageInfo: PageInfo
    }

    extend type Query {
        """
        Return all categories.
        """
        categories(
            searchText: SearchText,
            skip: Int,
            limit: Int,
            sort: JSON,
            ): CategoryConnection

        """
        Return a category.
        """
        category(id: ID!): Category
    }
`;

export default CategoryQuery;