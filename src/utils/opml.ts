import { store } from '~/store'
import api from '~/api'
import gql from 'graphql-tag'
import action from '~/store/actions'
import { send } from '~/systems'

export default async function(file: File) {
  const reader = new FileReader()
  reader.readAsText(file)
  const content = await new Promise<string>(resolve => {
    reader.onload = ({ target }) => resolve(target.result as string)
  })
  const parser = new DOMParser()
  const xml = parser.parseFromString(content, 'text/xml')
  const podcasts = Array.from(xml.querySelectorAll('outline'))
    .filter(({ attributes }) => (attributes as any).type?.value === 'rss')
    .map(({ attributes }) => ({
      name: (attributes as any).text?.value,
      url: (attributes as any).xmlUrl?.value,
    }))
    .filter(({ name, url }) => name && url)

  const format = url => url?.replace(/http(s?):\/\//, '').replace(/\/$/, '')
  Promise.all(
    podcasts.map(podcast =>
      api
        .query({
          query: gql`
            query opmlSearch($name: String!) {
              search(name: $name) {
                itunesId
                name
                feed
              }
            }
          `,
          variables: { name: podcast.name },
        })
        .catch(() => [podcast.name, false])
        .then(result => {
          const id = (result as any)?.data?.search?.find(
            ({ feed }) => format(feed) === format(podcast.url)
          )?.itunesId
          if (id)
            return api
              .query({
                query: gql`{ podcast(itunesId: ${id}) { itunesId } }`,
              })
              .then(() => {
                store.dispatch(action('SUBSCRIBE', id))
                return [podcast.name, true]
              })
              .catch(() => [podcast.name, false])
          else return [podcast.name, false]
        })
    )
  ).then(res => {
    const success = res.filter(([, v]) => v).map(([name]) => name)
    const fails = res.filter(([, v]) => !v).map(([name]) => name)

    send(
      'usecom',
      fails.length ? 'warn' : 'info',
      `${success.length} Podcasts added.` +
        (fails.length
          ? `\nCouldn't add ${fails.map(name => `"${name}"`).join(', ')}`
          : '')
    )
  })
}
