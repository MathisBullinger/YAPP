import State from '../state'
import * as a from '../actionTypes'
import { getToggleValue } from './utils'

const defaultState: State['podcasts'] = {
  byId: {},
  searches: {},
  fetching: false,
}

export default function(
  state: State['podcasts'] = defaultState,
  action: a.Base
): State['podcasts'] {
  switch (action.type) {
    case 'ADD_PODCAST':
      return {
        ...state,
        byId: {
          ...state.byId,
          [(action as a.PodcastAction).value
            .itunesId]: (action as a.PodcastAction).value,
        },
      }
    case 'ADD_SEARCH_RESULTS':
      return {
        ...state,
        searches: {
          ...state.searches,
          [(action as a.SearchResultAction)
            .search]: (action as a.SearchResultAction).results,
        },
      }
    case 'TOGGLE_PODCAST_FETCHING':
      return {
        ...state,
        fetching: getToggleValue(action, state.fetching),
      }
    default:
      return state
  }
}
