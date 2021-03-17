import * as pino from 'pino'
import { serialize } from './transform'

const logger = pino({
  formatters: {
    level: (l) => ({ type: l }),
  },
}, pino.destination({
  dest: './log-debug',
  minLength: 4096, //4kb logs buffer before it writes all the logs to log-debug
  sync: false,
})
).child({})


export function formatLog(resolver: string, payload: any = '') {
  return `${resolver}:${serialize(payload)}`
}

export default logger
