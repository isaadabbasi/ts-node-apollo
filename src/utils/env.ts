import * as _ from 'lodash'

export const verifyEnvironment = (): void => {
  console.info('Loading environment...\n')
}

export const parseBoolean = (str: string): boolean => {
  return _.isString(str)
    ? str === 'true' || str === '1'
    : !!str
}

export const lookupEnvKeyOrThrow = (key: string): string => {
  const value = process.env[key]
  if (_.isString(value)) return value
  throw new Error(`Environment variable ${key} is required`)
}
