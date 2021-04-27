import * as express from 'express'
import * as multer from 'multer'

import { logger as _logger } from '@src/utils'

const logger = _logger.getLoggerInstance()
const formatLog = _logger.formatLog

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = express.Router()

router.post('/file', upload.single('file'), (request: any, response) => {
  const file = request.file
  if (!file) {
    return response.status(500).send('Attachment Missing')
  }
  logger.info(formatLog(`'/upload/file:${file.originalname} uploaded`))
  return response.status(200).send(`File ${file.originalname} found`)
})

export default router
