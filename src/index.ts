require('dotenv').config()

import { startApolloSever, closeApolloServer } from './graphql/server'
import { verifyEnvironment } from './utils/env'
import { connect } from './db'

function logGoodbye(): void {
  console.log('Cya! Thanks for stopping by.')
}

function bootstrap(): Promise<void> {
  verifyEnvironment()
  return connect.default.then(startApolloSever)
}

function cleanExit(): Promise<any> {
  return closeApolloServer()
    .finally(() => {
      logGoodbye()
      process.exit()
    })
}

function handleError(err: Error): void {
  console.error(err)
  throw err
}

process.on('SIGINT', cleanExit)
process.on('SIGTERM', cleanExit)

bootstrap().catch(handleError)
