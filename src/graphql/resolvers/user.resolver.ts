import { ApolloCtx, GqlTypes } from '@src/defs'

const user = (_: any, args: GqlTypes.QueryUserArgs, ctx: ApolloCtx): string => {
  const id = args.id
  console.log('context: ', ctx)
  return id
}

export default {
  Mutation: {
    signin: (): Boolean => true,
  },
  Query: {
    user,
  },
}
