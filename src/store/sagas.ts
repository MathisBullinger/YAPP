import { takeLatest, put } from 'redux-saga/effects'
import { StringAction } from './actionTypes'
import api from '~/api'
import SearchQuery from '~/gql/SearchPodcast.gql'
import { SearchPodcast, SearchPodcastVariables } from '~/gqlTypes/SearchPodcast'
import { addPodcast, addSearchResults } from './actions'

export function* searchPodcast(action: StringAction) {
  const result = yield api.query<SearchPodcast, SearchPodcastVariables>({
    query: SearchQuery,
    variables: { name: action.value },
  })
  for (const podcast of (result.data as SearchPodcast).search) {
    yield put(
      addPodcast({
        itunesId: podcast.itunesId,
        name: podcast.name,
        creator: podcast.creator,
        feed: '',
        description: '',
        artworks: podcast.artworks,
      })
    )
  }
  yield put(
    addSearchResults(
      action.value,
      (result.data as SearchPodcast).search.map(podcast => podcast.itunesId)
    )
  )
}

export default function*() {
  yield takeLatest('SEARCH_PODCAST', searchPodcast)
}
