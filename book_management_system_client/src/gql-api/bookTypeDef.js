
import { gql } from 'graphql-tag';

const FIND_BOOK = gql`
    query FindBook($id: ID!){
        book(id: $id) {
            id
            title
            author
            publicationYear
        }
    }
`

const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $publicationYear: Int!) {
        addBook(title: $title, author: $author, publicationYear: $publicationYear) {
            id
            title
            author
            publicationYear
        }
    }
`

const EDIT_BOOK = gql`
    mutation EditBook($id: ID!, $title: String!, $author: String!, $publicationYear: Int!) {
        editBook(id: $id, title: $title, author: $author, publicationYear: $publicationYear) {
            id 
            title 
            author
            publicationYear
        }
    }
`

const DELETE_BOOK = gql`
    mutation DeleteBook($id: ID!) {
        deleteBook(id: $id) {
            message
        }
    }
`

export { FIND_BOOK, ADD_BOOK, EDIT_BOOK, DELETE_BOOK };
