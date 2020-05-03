import { gql } from "apollo-server";

export const Mutation = gql`

input CreateBookInput {
  """
  Post title.
  """
  title: String!

  """
  Post content.
  """
  author: String!
}

type Mutation {
    """
    Create a book.
    """
    createBook(input: CreateBookInput!): Book!
}`;
