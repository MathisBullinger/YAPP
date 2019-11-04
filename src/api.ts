import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new HttpLink({
      uri:
        process.env.NODE_ENV === 'development'
          ? 'https://83pzen9as1.execute-api.us-east-1.amazonaws.com/dev'
          : 'https://6lwizz1xvj.execute-api.us-east-1.amazonaws.com/prod',
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
})
