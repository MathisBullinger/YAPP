import { takeLatest, put } from 'redux-saga/effects'
import { StringAction } from './actionTypes'
import api from '~/api'
import SearchQuery from '~/gql/SearchPodcast.gql'
import FetchQuery from '~/gql/FetchPodcast.gql'
import { SearchPodcast, SearchPodcastVariables } from '~/gqlTypes/SearchPodcast'
import { FetchPodcast, FetchPodcastVariables } from '~/gqlTypes/FetchPodcast'
import { addPodcast, addSearchResults, togglePodcastFetching } from './actions'

export function* searchPodcast(action: StringAction) {
  yield put(togglePodcastFetching(true))
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
  yield put(togglePodcastFetching(false))
}

export function* fetchPodcast(action: StringAction) {
  yield put(togglePodcastFetching(true))
  const result = yield api.query<FetchPodcast, FetchPodcastVariables>({
    query: FetchQuery,
    variables: { id: action.value },
  })
  const podcast = (result.data as FetchPodcast).podcast
  yield put(
    addPodcast({
      itunesId: podcast.itunesId,
      name: podcast.name,
      creator: podcast.creator,
      feed: '',
      description: podcast.description,
      artworks: podcast.artworks,
    })
  )
  yield put(togglePodcastFetching(false))
}

export default function*() {
  yield takeLatest('SEARCH_PODCAST', searchPodcast)
  yield takeLatest('FETCH_PODCAST', fetchPodcast)
}
