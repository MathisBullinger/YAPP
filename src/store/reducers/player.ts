import * as a from '../actionTypes'
import State from '../state'
import { getToggleValue } from './utils'

const defaultState: State['player'] = {
  visible: false,
  playing: false,
  currentEpisode: null,
  progress: 0,
  length: 0,
}
export default function player(
  state: State['player'] = defaultState,
  action: a.Base
): State['player'] {
  switch (action.type) {
    case 'TOGGLE_PLAYER_VISIBLE':
      return {
        ...state,
        visible: getToggleValue(action, state.visible),
      }
    case 'TOGGLE_PLAYING':
      return {
        ...state,
        playing: getToggleValue(action, state.playing),
      }
    case 'SET_CURRENT_EPISODE':
      return {
        ...state,
        currentEpisode: (action as a.StringAction).value,
      }
    case 'SET_PLAYER_LENGTH':
      return {
        ...state,
        length: (action as a.NumberAction).value,
      }
    case 'SET_PLAYER_PROGRESS':
      return {
        ...state,
        progress: (action as a.NumberAction).value,
      }
    default:
      return state
  }
}