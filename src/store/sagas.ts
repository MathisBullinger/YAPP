import {
  takeLatest,
  takeEvery,
  put,
  call,
  putResolve,
} from 'redux-saga/effects'
import { StringAction } from './actionTypes'
import api from '~/api'
import SearchQuery from '~/gql/SearchPodcast.gql'
import FetchQuery from '~/gql/FetchPodcast.gql'
import FetchEpisodeQuery from '~/gql/FetchEpisode.gql'
import { SearchPodcast } from '~/gqlTypes/SearchPodcast'
import { FetchPodcast } from '~/gqlTypes/FetchPodcast'
import { FetchEpisode } from '~/gqlTypes/FetchEpisode'
import {
  addPodcast,
  addSearchResults,
  togglePodcastFetching,
  togglePodcastSearching,
  addEpisode,
} from './actions'

export function* searchPodcast(action: StringAction) {
  yield put(togglePodcastSearching(true))
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
        colors: [],
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
  yield put(togglePodcastSearching(false))
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
      colors: podcast.colors,
      _fetched: true,
      episodes: podcast.episodes.map(episode => ({
        title: episode.title,
        file: episode.file,
        date: parseInt(episode.date, 10),
        id: `${podcast.itunesId} ${episode.id}`,
        duration: episode.duration,
        _fetched: false,
      })),
    })
  )
  yield put(togglePodcastFetching(false))
}

export function* fetchEpisode(action: StringAction) {
  const [pId, eId] = action.value.split(' ')
  if (!pId || !eId) return
  const result = yield call(api.query, {
    query: FetchEpisodeQuery,
    variables: { pId, eId },
  })
  const episode = (result.data as FetchEpisode).episode
  yield putResolve(
    addEpisode(
      {
        ...episode,
        ...(episode.date && { date: parseInt(episode.date, 10) }),
        id: `${pId} ${episode.id}`,
        _fetched: true,
      },
      pId
    )
  )
}

export default function*() {
  yield takeLatest('SEARCH_PODCAST', searchPodcast)
  yield takeLatest('FETCH_PODCAST', fetchPodcast)
  yield takeEvery('FETCH_EPISODE', fetchEpisode)
}
