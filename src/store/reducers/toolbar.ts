import { actions as a } from '../actions'
import State from '../state'
import { getToggleValue } from './utils'

const defaultState: State['toolbar'] = {
  visible: false,
}
export default function toolbar(
  state: State['toolbar'] = defaultState,
  action: a.Base
): State['toolbar'] {
  switch (action.type) {
    case 'TOGGLE_TOOLBAR':
      return {
        ...state,
        visible: getToggleValue(action, state.visible),
      }
    default:
      return state
  }
}
