import { gql } from "apollo-server";

export const Query = gql`type Query {
    """
    Returns all books.
    """
    books: [Book]
}`;
