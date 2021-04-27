import { entities } from '@src/db'

export interface ApolloCtx {
  request: Request
  response: http.ServerResponse
  user: entities.User
}
