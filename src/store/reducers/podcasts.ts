import { getToggleValue } from './utils'
import defaultState from '../defaultState'

export default function(
  state = defaultState['podcasts'],
  action: any
): State['podcasts'] {
  switch (action.type) {
    case 'ADD_PODCAST': {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.value.itunesId]: action.value,
        },
      }
    }
    case 'ADD_PODCASTS':
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.values.reduce((a, c) => ({ ...a, [c.itunesId]: c }), {}),
        },
      }
    case 'ADD_EPISODE': {
      const podId = action.podId
      const episode = action.value
      const episodeOld = state.byId[podId].episodes.find(
        ({ id }) => id === episode.id
      )

      return {
        ...state,
        byId: {
          ...state.byId,
          [podId]: {
            ...state.byId[podId],
            episodes: [
              ...state.byId[podId].episodes.filter(
                ({ id }) => id !== episode.id
              ),
              {
                ...episodeOld,
                ...episode,
              },
            ],
          },
        },
      }
    }
    case 'ADD_SEARCH_RESULTS':
      return {
        ...state,
        searches: {
          ...state.searches,
          [action.search]: action.results,
        },
      }
    case 'TOGGLE_PODCAST_FETCHING':
      return {
        ...state,
        fetching: getToggleValue(action, state.fetching),
      }
    case 'TOGGLE_PODCAST_SEARCHING':
      return {
        ...state,
        searching: getToggleValue(action, state.searching),
      }
    default:
      return state
  }
}
