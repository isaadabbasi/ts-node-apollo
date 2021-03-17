import { gql } from 'apollo-server'

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type User {
    id: ID
    fullname: String
    username: String
    password: String
  }
  type Query {
    books: [Book]
    users: [User]
  }
`

export default typeDefs
