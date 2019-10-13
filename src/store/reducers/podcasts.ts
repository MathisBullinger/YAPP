import State from '../state'
import * as a from '../actionTypes'
import { getToggleValue } from './utils'
import defaultState from '../defaultState'

export default function(
  state = defaultState['podcasts'],
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
    case 'ADD_EPISODE': {
      const podId = (action as a.EpisodeAction).podId
      const episode = (action as a.EpisodeAction).value
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
          [(action as a.SearchResultAction)
            .search]: (action as a.SearchResultAction).results,
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
