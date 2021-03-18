import * as pino from 'pino'
import { serialize } from './transform'

export const destination = pino.destination({
  dest: './log-debug',
  minLength: 4096, //4kb logs buffer before it writes all the logs to log-debug
  sync: false,
})

export function createLoggerInstance(): pino.Logger {
  return pino(
    {
      formatters: {
        level: (l) => ({ type: l }),
      },
    },
    destination
  ).child({})
}

let loggerCached: pino.Logger
export function getLoggerInstance(): pino.Logger {
  if (loggerCached) {
    return loggerCached
  }
  const _logger = createLoggerInstance()
  loggerCached = _logger
  return getLoggerInstance()
}

export function formatLog(resolver: string, payload: any = '') {
  return `${resolver}:${serialize(payload)}`
}
