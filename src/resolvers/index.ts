import productResolvers from '@app/modules/products/resolvers';
import categoryResolvers from '@app/modules/products/categories/resolvers';

export default {
    ...productResolvers,
    ...categoryResolvers,
    Query: {
        ...productResolvers.Query,
        ...categoryResolvers.Query
    },
    Mutation: {
        ...productResolvers.Mutation,
        ...categoryResolvers.Mutation
    }
}

