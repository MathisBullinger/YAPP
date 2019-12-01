import { getToggleValue } from './utils'
import defaultState from '../defaultState'
import { assemble as a } from '~/store/actions'

export default function toolbar(
  state = defaultState['toolbar'],
  action:
    | a<'TOGGLE_TOOLBAR'>
    | a<'SET_TOOLBAR_TITLE'>
    | a<'ADD_TOOLBAR_ACTION'>
    | a<'RESET_TOOLBAR_ACTIONS'>
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
