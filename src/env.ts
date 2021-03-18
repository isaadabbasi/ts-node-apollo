import { env } from './utils'

export const TYPEORM_CONNECTION = process.env.TYPEORM_CONNECTION
export const TYPEORM_USERNAME = process.env.TYPEORM_USERNAME
export const TYPEORM_PASSWORD = process.env.TYPEORM_PASSWORD
export const TYPEORM_HOST = process.env.TYPEORM_HOST
export const TYPEORM_PORT = process.env.TYPEORM_PORT
export const TYPEORM_DATABASE = process.env.TYPEORM_DATABASE
export const TYPEORM_MIGRATIONS_RUN = process.env.TYPEORM_MIGRATIONS_RUN
export const TYPEORM_MIGRATIONS_DIR = process.env.TYPEORM_MIGRATIONS_DIR
export const TYPEORM_DROP_SCHEMA = process.env.TYPEORM_DROP_SCHEMA
export const TYPEORM_SYNCHRONIZE = env.parseBoolean(process.env.TYPEORM_SYNCHRONIZE)
export const TYPEORM_LOGGING = env.parseBoolean(process.env.TYPEORM_LOGGING)

export const APOLLO_DEBUG_ENABLED = env.parseBoolean(process.env.APOLLO_DEBUG_ENABLED)
export const APOLLO_TRACING_ENABLED = env.parseBoolean(process.env.APOLLO_TRACING_ENABLED)
export const FAST_BOOT = env.parseBoolean(process.env.FAST_BOOT)
