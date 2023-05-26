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
        login(email: String!, password: String!): AuthPayload

        addBook(title: String!, author: String!, publicationYear: Int!): Book!
        editBook(id: ID!, title: String!, publicationYear: Int!): Book!
        deleteBook(id: ID!): Book!
    }

    type AuthPayload {
        token: String 
        user: User
    }
`

module.exports = typeDefs;