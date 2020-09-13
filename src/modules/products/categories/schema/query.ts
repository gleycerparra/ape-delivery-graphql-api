import { gql } from 'apollo-server';

const CategoryQuery = gql`
    type CategoryConnection {
        data: [Category],
        pageInfo: PageInfo
    }

    extend type Query {
        """
        Return all categories.
        If you provide and invalid param such as (limit: 0, skip > total) the pagination will be ignored and might return null or an error.
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