import { mergeResolvers } from '@graphql-tools/merge'
// @ts-ignore-nextline
import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date'
import userResolvers from './user.resolver'

const dateTimeResolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
}

const resolvers = mergeResolvers([
  dateTimeResolvers,
  userResolvers,
])

export default resolvers
