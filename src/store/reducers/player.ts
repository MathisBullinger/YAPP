import { getToggleValue, setup } from './utils'
import { assemble as a } from '~/store/actions'

export default setup('player', ['volume'], function(
  state: State['player'],
  action:
    | a<'TOGGLE_PLAYER_VISIBLE'>
    | a<'SET_PLAYER_STATE'>
    | a<'SET_CURRENT_EPISODE'>
    | a<'SET_PLAYER_LENGTH'>
    | a<'SET_PLAYER_PROGRESS'>
    | a<'SET_PLAYER_BUFFERED'>
    | a<'SET_PLAYER_FETCHING'>
    | a<'SET_LAST_SEEK'>
    | a<'SET_PLAYER_VOLUME'>
): State['player'] {
  switch (action.type) {
    case 'TOGGLE_PLAYER_VISIBLE':
      return {
        ...state,
        visible: getToggleValue(action, state.visible),
      }
    case 'SET_PLAYER_STATE':
      return {
        ...state,
        state: action.value,
      }
    case 'SET_CURRENT_EPISODE':
      return {
        ...state,
        currentEpisode: action.value,
      }
    case 'SET_PLAYER_LENGTH':
      return {
        ...state,
        length: action.value,
      }
    case 'SET_PLAYER_PROGRESS':
      return {
        ...state,
        progress: action.value,
        progLastUpdate: performance.now(),
      }
    case 'SET_PLAYER_BUFFERED':
      return {
        ...state,
        buffered: action.value,
      }
    case 'SET_PLAYER_FETCHING':
      return {
        ...state,
        fetching: getToggleValue(action, state.fetching),
      }
    case 'SET_LAST_SEEK':
      return {
        ...state,
        lastSeek: action.value,
      }
    case 'SET_PLAYER_VOLUME':
      return {
        ...state,
        volume: action.value,
      }
    default:
      return state
  }
})
