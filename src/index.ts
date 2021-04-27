require('dotenv').config()

import { startExpressServer, closeApolloServer } from './server'
import { verifyEnvironment } from './env'
import { connect } from './db'

const logGoodbye = (): void => {
  console.log('Cya! Thanks for stopping by.')
}

const bootstrap = (): Promise<void> => {
  verifyEnvironment()
  return connect.default.then(startExpressServer)
}

const cleanExit = (): Promise<any> => {
  return closeApolloServer()
    .finally(() => {
      logGoodbye()
      process.exit()
    })
}

const handleError = (err: Error): void => {
  console.error(err)
  throw err
}

process.on('SIGINT', cleanExit)
process.on('SIGTERM', cleanExit)

bootstrap().catch(handleError)
