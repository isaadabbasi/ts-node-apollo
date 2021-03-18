import resolvers from './resolvers'

describe('[UNIT] src/graphql/resolvers.ts', () => {
  it('should be an object', () => {
    expect(typeof resolvers).toBe('object')
  })

  it('should not be empty object', () => {
    const keyslen = Object.keys(resolvers).length
    expect(keyslen).toBeGreaterThan(0)
  })
})
