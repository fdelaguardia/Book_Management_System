
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context"

import { baseUrl } from "./baseUrl";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                books: {
                    keyArgs: false,
                    merge: (existing = [], incoming) => [...existing, ...incoming.books],
                }
            }
        }
    }
})

const httpLink = createHttpLink({ uri: baseUrl })

const authUri = setContext((_, { headers }) => {

    const token = localStorage.getItem('authToken');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({ cache: cache, link: authUri.concat(httpLink) })

export default client