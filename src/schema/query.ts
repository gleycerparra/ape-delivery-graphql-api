import { gql } from "apollo-server";

export const Query = gql`

scalar JSON
scalar DateTime
scalar Time
scalar Date

""" type Query {
    _empty: String
} """

input SearchText {
    fields: [String]!
    text: String!
}

type PageInfo {
    from: Int
    to: Int
    total: Int
    hasNextPage: Boolean
    hasPreviousPage: Boolean
}

`