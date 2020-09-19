import { ApolloError } from "apollo-server";

export default class NotFoundExeception {
    constructor(subject: string, id: string) {
        return new ApolloError(
            `${subject} with ${id} id not found`,
            'NOT_FOUND'
        );
    }
}