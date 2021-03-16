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
  },
}

export default resolvers
