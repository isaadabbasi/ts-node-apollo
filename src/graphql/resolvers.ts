import { UserRepository } from "../db/repositories"

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
      console.log(users)
      return users
    }
  },
}

export default resolvers
