import { ApolloServer } from 'apollo-server'

import typeDefs from './typedefs'
import resolvers from './resolvers'

export const startApolloSever = async (): Promise<void> => {
  const server = new ApolloServer({ typeDefs, resolvers  })
  const PORT = 4000
  return server.listen(PORT).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

export const closeApolloServer = (): Promise<boolean> => {
  // TODO --
  //  - Close all database connections
  //  - Kill current host:port of graphql
  //  - Wait for atleast 500ms
  return Promise.resolve(true)
}
