require('dotenv').config()

import * as pgtools from 'pgtools'
import * as envars from '../src/env'

const _config = {
  user: envars.TYPEORM_USERNAME,
  password: envars.TYPEORM_PASSWORD,
  port: envars.TYPEORM_PORT,
  host: envars.TYPEORM_HOST,
}

pgtools.dropdb(_config, envars.TYPEORM_DATABASE)
  .then(() => console.log('✅ Database removed'))
  .catch(() => console.error('❌ Error removing database'))
