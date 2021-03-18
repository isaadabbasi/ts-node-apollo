import { UserRepository } from "@src/db/repositories"
import { logger as _logger } from '@src/utils'
const { default: logger, formatLog } = _logger

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
  {
    title: 'City of Caucassis',
    author: 'James Author',
  },
]

const resolvers = {
  Query: {
    books: () => books,
    users: async () => {
      const users = await UserRepository.getUserList()
      logger.info(formatLog('users', users))
      return users
    }
  },
}

export default resolvers
