import { StringAction, ToggleAction } from './actionTypes'
import api from '~/api'
import SearchQuery from '~/gql/SearchPodcast.gql'
import FetchQuery from '~/gql/FetchPodcast.gql'
import FetchEpisodeQuery from '~/gql/FetchEpisode.gql'
import { SearchPodcast } from '~/gqlTypes/SearchPodcast'
import { FetchPodcast } from '~/gqlTypes/FetchPodcast'
import { FetchEpisode } from '~/gqlTypes/FetchEpisode'
import { send } from '~/systems'
import {
  takeLatest,
  takeEvery,
  put,
  call,
  putResolve,
} from 'redux-saga/effects'
import {
  addPodcast,
  addSearchResults,
  togglePodcastFetching,
  togglePodcastSearching,
  addEpisode,
  setDarkAtNight,
} from './actions'
import { GeolocationError } from 'react-native'

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

export function* toggleDarkAtNight(action: ToggleAction) {
  if (!action.value) return yield put(setDarkAtNight(false))
  let hasPermission = false
  try {
    const result = yield call(v => navigator.permissions.query(v), {
      name: 'geolocation',
    })
    if (result.state === 'denied')
      return send(
        'usecom',
        'warn',
        'Access to your location was denied. If you want to use this feature, you will have to enable location access for this website in your browser.'
      )

    hasPermission = result.state === 'granted'
  } catch (e) {}
  if (hasPermission) return yield put(setDarkAtNight(true))

  const allow = yield call(
    send,
    'usecom',
    'request',
    'Calculating time of day and night requires permission to access your device location.'
  )
  if (!allow) return

  const request = () =>
    new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        () => resolve(true),
        () => resolve(false)
      )
    })

  const allowed = yield call(request)

  if (!allowed)
    return send(
      'usecom',
      'warn',
      'Access to your location was denied. If you want to use this feature in future, you will have to re-enable the permission in your browser.'
    )

  yield put(setDarkAtNight(true))
}

export default function*() {
  yield takeLatest('SEARCH_PODCAST', searchPodcast)
  yield takeLatest('FETCH_PODCAST', fetchPodcast)
  yield takeEvery('FETCH_EPISODE', fetchEpisode)
  yield takeEvery('TOGGLE_DARK_AT_NIGHT', toggleDarkAtNight)
}
