import * as a from '../actionTypes'
import State from '../state'
import { getToggleValue } from './utils'

const defaultState: State['player'] = {
  active: true,
}
export default function player(
  state: State['player'] = defaultState,
  action: a.Base
): State['player'] {
  switch (action.type) {
    case 'TOGGLE_PLAYER':
      return {
        ...state,
        active: getToggleValue(action, state.active),
      }
    default:
      return state
  }
}
