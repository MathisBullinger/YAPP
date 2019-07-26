import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { handleGraphError } from '~/error'

const createClient = url => {
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(handleGraphError),
      createHttpLink({
        uri: url,
      }),
    ]),
    fetchOptions: {
      mode: 'no-cors',
    },
    cache: new InMemoryCache(),
  })
  return client
}

export default createClient(
  'https://83pzen9as1.execute-api.us-east-1.amazonaws.com/dev'
)
