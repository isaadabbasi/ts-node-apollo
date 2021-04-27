import { ApolloServer } from 'apollo-server'
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import * as express from 'express'
import * as Jwt from 'jsonwebtoken'
import * as cors from 'cors'

import { ApolloCtx } from '@src/defs'
import { AppErrors } from '@src/graphql/errors'
import { FileUploadRoutes } from '@src/routes'
import { Maybe } from '@src/defs/gql-types'
import { misc } from '@src/utils'
import * as envars from '@src/env'
import resolvers from '@src/graphql/resolvers'
import typeDefs from '@src/graphql/schema'

const getUserFromJwt = (request: any): Maybe<ApolloCtx['user']> => {
  const token = request.headers.authorization
  if (!token) {
    return null
  }
  try {
    const decoded = Jwt.verify(token, misc.PUBLIC_KEY) as NonNullable<{ user: ApolloCtx['user'] }>
    const user = decoded.user
    return user
  } catch (e) {
    if (e instanceof Jwt.TokenExpiredError) {
      throw AppErrors.buildCustomError('Token Expired')
    }
    throw AppErrors.buildCustomError('Invalid Token Provided')
  }
}

const apolloConfig = {
  schema: makeExecutableSchema({ typeDefs: typeDefs(), resolvers }),
  cors: true,
  context: (ctx: any): any => {
    const { req: request, res: response } = ctx
    const user = getUserFromJwt(request)
    return { request, response, user }
  },
}

export const startApolloSever = async (): Promise<void> => {
  const server = new ApolloServer(apolloConfig)
  const { url } = await server.listen(envars.SERVER_PORT)
  console.log(`🚀  Server ready at ${url}`)
}

const checkUserMiddleware = (request: express.Request, response: express.Response, next: any): void => {
  const user = getUserFromJwt(request)
  if (!user) {
    response.status(401).send('Authentication Required')
    return
  }

  next()
}

export const startExpressServer = async (): Promise<void> => {
  const app = express()
  const server = new ApolloServerExpress(apolloConfig)
  server.start()
    .then(() => {
      const port = envars.SERVER_PORT
      server.applyMiddleware({ app })
      if (envars.NODE_ENV === 'development') {
        app.use(cors({ exposedHeaders: 'Authorization' }))
      }
      app.use('/upload', checkUserMiddleware, FileUploadRoutes)
      app.listen({ port }, () => void console.log(`🚀 Server ready at ${port}`))
    })
}

export const closeApolloServer = (): Promise<boolean> => {
  // TODO --
  //  - Close all database connections
  //  - Kill current host:port of graphql
  //  - Wait for atleast 500ms
  return Promise.resolve(true)
}
