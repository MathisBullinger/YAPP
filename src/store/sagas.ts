import { takeLatest } from 'redux-saga/effects'
import { StringAction } from './actionTypes'
import api from '~/api'
import SearchQuery from '~/gql/SearchPodcast.gql'
import { SearchPodcast, SearchPodcastVariables } from '~/gqlTypes/SearchPodcast'

export function* searchPodcast(action: StringAction) {
  const result = yield api.query<SearchPodcast, SearchPodcastVariables>({
    query: SearchQuery,
    variables: { name: action.value },
  })
  console.log(result.data.search)
}

export default function*() {
  yield takeLatest('SEARCH_PODCAST', searchPodcast)
}
