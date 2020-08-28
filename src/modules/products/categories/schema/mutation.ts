import { gql } from 'apollo-server';

const CategoryMutation = gql`
    input SubcategoryInput {
        """
        Subcategory sku.
        """
        sku: String!
        """
        Subcategory name.
        """
        name: String!
        """
        Subcategory description.
        """
        description: String!
        """
        If subcategory is active.
        """
        isActive: Boolean!
    }

    input CreateCategoryInput {
        """
        Category sku.
        """
        sku: String!
        """
        Category name.
        """
        name: String!
        """
        Category description.
        """
        description: String!
        """
        If category is active.
        """
        isActive: Boolean!
        """
        Subcategories.
        """
        subcategories: [SubcategoryInput]
    }

    input UpdateCategoryInput {
        """
        Category sku.
        """
        sku: String!
        """
        Category name.
        """
        name: String!
        """
        Category description.
        """
        description: String!
        """
        If category is active.
        """
        isActive: Boolean!
        """
        Subcategories.
        """
        subcategories: [SubcategoryInput]
    }

    extend type Mutation {
        """
        Create a category.
        """
        createCategory(category: CreateCategoryInput!): Category!
        """
        Update a Category.
        """
        updateCategory(id: ID!, category: UpdateCategoryInput!): Category!
        """
        delete a Category.
        """
        deleteCategory(id: ID!): Category!
    }
`;

export default CategoryMutation;