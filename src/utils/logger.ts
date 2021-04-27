import * as pino from 'pino'
import { NODE_ENV } from '@src/env'
import { serialize } from './transform'

export const createLoggerInstance = (): pino.Logger => {
  return pino(
    {
      formatters: {
        level: (l) => ({ type: l }),
      },
    },
    destination,
  ).child({})
}

export const destination = pino.destination({
  dest: './log-debug',
  minLength: NODE_ENV === 'production' ? 4096: 512, //4kb logs buffer before it writes all the logs to log-debug
  sync: false,
})

export const getLoggerInstance = (): pino.Logger => {
  if (loggerCached) {
    return loggerCached
  }
  const _logger = createLoggerInstance()
  loggerCached = _logger
  return getLoggerInstance()
}
export const formatLog = (resolver: string, payload: any = ''): string => {
  return `${resolver}:${serialize(payload)}`
}

let loggerCached: pino.Logger
