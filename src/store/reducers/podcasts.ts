import State from '../state'
import * as a from '../actionTypes'

const defaultState: State['podcasts'] = { byId: {}, searches: {} }

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
    default:
      return state
  }
}
