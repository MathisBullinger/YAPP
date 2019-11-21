import { getToggleValue } from './utils'
import defaultState from '../defaultState'

export default function toolbar(
  state = defaultState['toolbar'],
  action: any
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
        title: action.value,
      }
    case 'ADD_TOOLBAR_ACTION':
      return {
        ...state,
        actions: [...state.actions, action.value],
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
