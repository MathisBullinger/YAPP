import { actions as a } from '../actions'
import State from '../state'
import { getToggleValue } from './utils'

const defaultState: State['toolbar'] = {
  visible: false,
  title: '',
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
    case 'SET_TOOLBAR_TITLE':
      return {
        ...state,
        title: (action as a.StringAction).value,
      }
    default:
      return state
  }
}
