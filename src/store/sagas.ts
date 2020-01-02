import api from '~/api'
import SearchQuery from '~/gql/SearchPodcast.gql'
import FetchQuery from '~/gql/FetchPodcast.gql'
import FetchMetaQuery from '~/gql/FetchPodcastMeta.gql'
import FetchEpisodeQuery from '~/gql/FetchEpisode.gql'
import FetchLibraryQuery from '~/gql/FetchLibrary.gql'
import { SearchPodcast } from '~/gqlTypes/SearchPodcast'
import { FetchPodcast } from '~/gqlTypes/FetchPodcast'
import { FetchEpisode } from '~/gqlTypes/FetchEpisode'
import { FetchLibrary } from '~/gqlTypes/FetchLibrary'
import { send } from '~/systems'
import {
  takeLatest,
  takeEvery,
  put,
  call,
  putResolve,
  select,
} from 'redux-saga/effects'
import a, { assemble } from '~/store/actions'
import persist from '~/store/persist'

export function* searchPodcast(action: assemble<'SEARCH_PODCAST'>) {
  yield put(a('TOGGLE_PODCAST_SEARCHING', true))
  const result = yield call(api.query, {
    query: SearchQuery,
    variables: { name: action.value },
  })
  for (const podcast of (result.data as SearchPodcast).search) {
    yield put(
      a('ADD_PODCAST', {
        value: {
          itunesId: podcast.itunesId,
          name: podcast.name,
          creator: podcast.creator,
          feed: '',
          description: '',
          artworks: podcast.artworks,
          colors: [],
          episodes: null,
          _fetched: false,
        },
      })
    )
  }
  yield put(
    a('ADD_SEARCH_RESULTS', {
      search: action.value,
      results: (result.data as SearchPodcast).search.map(
        podcast => podcast.itunesId
      ),
    })
  )
  yield put(a('TOGGLE_PODCAST_SEARCHING', false))
}

export function* fetchPodcast(action: assemble<'FETCH_PODCAST'>) {
  yield put(a('TOGGLE_PODCAST_FETCHING', true))
  const result = yield call(api.query, {
    query: action.metaOnly ? FetchMetaQuery : FetchQuery,
    variables: { id: action.value },
  })
  const podcast = (result.data as FetchPodcast).podcast
  yield putResolve(a('ADD_PODCAST', { value: mapPodcast(podcast) }))
  yield put(a('TOGGLE_PODCAST_FETCHING', false))
}

export function* fetchLibrary(action: assemble<'FETCH_LIBRARY'>) {
  yield put(a('TOGGLE_PODCAST_FETCHING', true))
  const result = yield call(api.query, {
    query: FetchLibraryQuery,
    variables: { ids: action.values },
  })
  const podcasts = (result.data as FetchLibrary).podcasts
  yield put(a('ADD_PODCASTS', { values: podcasts.map(mapPodcast) }))
  yield put(a('TOGGLE_PODCAST_FETCHING', false))
}

export function* fetchEpisode(action: assemble<'FETCH_EPISODE'>) {
  const [pId, eId] = action.value.split(' ')
  if (!pId || !eId) return
  const result = yield call(api.query, {
    query: FetchEpisodeQuery,
    variables: { pId, eId },
  })
  const episode = (result.data as FetchEpisode).episode
  yield putResolve(
    a('ADD_EPISODE', {
      value: {
        ...episode,
        ...(episode.date && { date: parseInt(episode.date, 10) }),
        id: `${pId} ${episode.id}`,
        _fetched: true,
      },
      podId: pId,
    })
  )
}

export function* toggleDarkAtNight(action: assemble<'TOGGLE_DARK_AT_NIGHT'>) {
  if (!action.value) return yield put(a('SET_DARK_AT_NIGHT', false))
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
  if (hasPermission) return yield put(a('SET_DARK_AT_NIGHT', true))

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

  yield put(a('SET_DARK_AT_NIGHT', true))
}

export function* persistSubscriptions() {
  const subscriptions = yield select((state: State) => state.subscriptions)
  yield call(async () => persist.DB.put('subscriptions', subscriptions, 'ids'))
}

export function* persistTheme() {
  const theme = {
    ...(yield select((state: State) => state.theme)),
    manualOverride: false,
  }
  const dbTheme = yield Promise.all(
    Object.keys(theme).map(k => persist.DB.get('theme', k).then(v => [k, v]))
  ).then(Object.fromEntries)
  yield Promise.all(
    Object.entries(theme).flatMap(([k, v]) =>
      v === dbTheme[k] ? [] : [persist.DB.put('theme', v as any, k)]
    )
  )
}

const mapPodcast = (
  data: FetchPodcast['podcast'] | FetchLibrary['podcasts'][0]
) => ({
  itunesId: data.itunesId,
  name: data.name,
  creator: data.creator,
  feed: 'feed' in data ? data.feed : '',
  description: 'description' in data ? data.description : '',
  artworks: data.artworks,
  colors: data.colors,
  _fetched: true,
  ...('episodes' in data && {
    episodes: data.episodes.map(episode => ({
      title: episode.title,
      file: episode.file,
      date: parseInt(episode.date, 10),
      id: `${data.itunesId} ${episode.id}`,
      duration: episode.duration,
      _fetched: false,
    })),
  }),
})

export default function*() {
  yield takeLatest('SEARCH_PODCAST', searchPodcast)
  yield takeLatest('FETCH_PODCAST', fetchPodcast)
  yield takeLatest('FETCH_LIBRARY', fetchLibrary)
  yield takeEvery('FETCH_EPISODE', fetchEpisode)
  yield takeEvery('TOGGLE_DARK_AT_NIGHT', toggleDarkAtNight)
  yield takeLatest(['SUBSCRIBE', 'UNSUBSCRIBE'], persistSubscriptions)
  yield takeLatest(
    [
      'SET_THEME',
      'TOGGLE_DARK_MODE',
      'TOGGLE_PREFER_AMOLED',
      'SET_DARK_AT_NIGHT',
      'TOGGLE_DARK_USE_SYSTEM',
      'SHOW_DARKMODE_TOGGLE',
    ],
    persistTheme
  )
}
