import * as dotenv from 'dotenv'
import * as _path from 'path'

const relativePathToJestEnvFile = 'src/configs/jest.env'
const path = _path.join(process.cwd(), relativePathToJestEnvFile)
dotenv.config({ path })
