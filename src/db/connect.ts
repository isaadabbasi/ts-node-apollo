import { createConnection } from 'typeorm'
import * as pgtools from 'pgtools'
import { User } from './entities'
import * as envars from '../env'

function createDB(config: { [x: string]: any } = {}): Promise<any> {
  const _config = {
    user: envars.TYPEORM_USERNAME,
    password: envars.TYPEORM_PASSWORD,
    port: envars.TYPEORM_PORT,
    host: envars.TYPEORM_HOST,
    ...config
  }
  const database = config.database || envars.TYPEORM_DATABASE
  return pgtools.createdb(_config, database)
    .then(res => {
      console.info(`📦 ${database} db is now created. YAAAY :)!!`)
      return res
    })
    .catch(err => {
      console.info(`${database} db is already created, ignore this`)
      return err
    })
}

function connectToDB(config = {}) {
  return createConnection({
    type: 'postgres',
    host: envars.TYPEORM_HOST,
    port: Number.parseInt(envars.TYPEORM_PORT),
    username: envars.TYPEORM_USERNAME,
    password: envars.TYPEORM_PASSWORD,
    database: envars.TYPEORM_DATABASE,
    entities: [User],
    synchronize: envars.TYPEORM_SYNCHRONIZE,
    logging: envars.TYPEORM_LOGGING,
    migrations: [
      `${envars.TYPEORM_MIGRATIONS_DIR}/*.ts`,
      `${envars.TYPEORM_MIGRATIONS_DIR}/*.js`,
    ],
    ...config
  })
}

export function establishConnection(config = {}) {
  let beforeConnet = Promise.resolve()
  if (!envars.FAST_BOOT) beforeConnet = createDB(config)
  return beforeConnet.then(() => connectToDB(config))
}

const connection = establishConnection()
export default connection
