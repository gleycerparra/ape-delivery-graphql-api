import { gql } from "apollo-server";

export const Query = gql`

scalar JSON

type Query {
    _empty: String
}

type PageInfo {
    from: Int
    to: Int
    total: Int
    hasNextPage: Boolean
    hasPreviousPage: Boolean
}

`