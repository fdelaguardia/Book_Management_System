const gql = require("graphql-tag");

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        favoriteBooks: [Book!]!
        currentlyReadingBooks: [Book!]!
    }

    type Book {
        id: ID!
        title: String!
        author: String!
        publicationYear: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        book(id: ID!): Book
        findUser: User
    }

    type Mutation {
        signup(firstName: String!, lastName: String!, email: String!, password: String!): User
        login(email: String!, password: String!): handleLogin

        addBook(title: String!, author: String!, publicationYear: Int!): Book!
        editBook(id: ID!, title: String!, author: String!, publicationYear: Int!): Book!
        deleteBook(id: ID!): handleDelete
    }

    type handleLogin {
        token: String 
        user: User
    }

    type handleDelete {
        message: String
    }
`

module.exports = typeDefs;