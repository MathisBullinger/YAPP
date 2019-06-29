export const handleGraphError = ({
  graphQLErrors: client,
  /*operation,
  response,*/
}) => {
  if (client) {
    client.forEach(err => {
      if (!err.extensions) return
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          break
        case 'BAD_USER_INPUT':
          break
        case 'INTERNAL_SERVER_ERROR':
          break
        default:
          break
      }
    })
  }
}
