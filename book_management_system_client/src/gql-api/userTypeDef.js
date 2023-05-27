
import gql from "@apollo/client"

const FIND_USER = gql`
    query FindUser {
        findUser {
            id
            firstName
            lastName
            email
        }
    }
`

const SIGNUP = gql`
    mutation Signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            id
            firstName
            lastName
            email
        }
    }
`

const LOGIN = gql`
    mutation Login(email: String!, password: String!) {
        login(email: $email, password: $password){
            id
            email
        }
    }
`

export { FIND_USER, SIGNUP, LOGIN };