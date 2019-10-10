import { takeLatest, put, call, putResolve } from 'redux-saga/effects'
import { StringAction } from './actionTypes'
import api from '~/api'
import SearchQuery from '~/gql/SearchPodcast.gql'
import FetchQuery from '~/gql/FetchPodcast.gql'
import { SearchPodcast } from '~/gqlTypes/SearchPodcast'
import { FetchPodcast } from '~/gqlTypes/FetchPodcast'
import { addPodcast, addSearchResults, togglePodcastFetching } from './actions'

export function* searchPodcast(action: StringAction) {
  yield put(togglePodcastFetching(true))
  const result = yield call(api.query, {
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
        episodes: null,
        _fetched: false,
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
  const result = yield call(api.query, {
    query: FetchQuery,
    variables: { id: action.value },
  })
  const podcast = (result.data as FetchPodcast).podcast
  yield putResolve(
    addPodcast({
      itunesId: podcast.itunesId,
      name: podcast.name,
      creator: podcast.creator,
      feed: '',
      description: podcast.description,
      artworks: podcast.artworks,
      _fetched: true,
      episodes: podcast.episodes.map(episode => ({
        title: episode.title,
        artworks: episode.artworks,
        file: episode.file,
        date: parseInt(episode.date, 10),
        id: `${podcast.itunesId} ${episode.id}`,
        duration: episode.duration,
        description: episode.description,
        // @ts-ignore
        content: episode.content,
      })),
    })
  )
  yield put(togglePodcastFetching(false))
}

export default function*() {
  yield takeLatest('SEARCH_PODCAST', searchPodcast)
  yield takeLatest('FETCH_PODCAST', fetchPodcast)
}
