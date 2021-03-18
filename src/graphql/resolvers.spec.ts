import { logger as loggerUtils } from '@src/utils'
import resolvers from './resolvers'

const logger = loggerUtils.getLoggerInstance()

describe('[UNIT] src/graphql/resolvers.ts', () => {
  it('should be an object', () => {
    expect(typeof resolvers).toBe('object')
  })

  it('should not be empty object', () => {
    const keyslen = Object.keys(resolvers).length
    expect(keyslen).toBeGreaterThan(0)
  })
})
