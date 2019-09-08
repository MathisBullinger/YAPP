import * as a from '../actionTypes'
import State from '../state'
import { getToggleValue } from './utils'

const defaultState: State['toolbar'] = {
  visible: false,
  title: '',
  actions: [],
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
    case 'ADD_TOOLBAR_ACTION':
      return {
        ...state,
        actions: [...state.actions, (action as a.StringAction).value],
      }
    case 'RESET_TOOLBAR_ACTIONS':
      return {
        ...state,
        actions: [],
      }
    default:
      return state
  }
}
