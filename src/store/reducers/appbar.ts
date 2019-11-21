import { getToggleValue } from './utils'
import defaultState from '../defaultState'

export default function appbar(
  state = defaultState['appbar'],
  action: any
): State['appbar'] {
  switch (action.type) {
    case 'TOGGLE_APPBAR':
      return {
        ...state,
        visible: getToggleValue(action, state.visible),
      }
    case 'TOGGLE_APPBAR_HIDDEN':
      return {
        ...state,
        hidden: getToggleValue(action, state.hidden),
      }
    case 'SET_APPBAR_TITLE':
      return {
        ...state,
        title: action.value,
      }
    case 'ADD_APPBAR_ACTION':
      return {
        ...state,
        ...{
          actions: [
            {
              name: action.name,
              align: action.align,
            },
          ],
        },
      }
    case 'RESET_APPBAR_ACTIONS':
      return {
        ...state,
        ...{ actions: [] },
      }
    case 'TOGGLE_APPBAR_LOADING':
      return {
        ...state,
        loading: getToggleValue(action, state.loading),
      }
    case 'TOGGLE_HIDE_APPBAR_ON_SCROLL':
      return {
        ...state,
        hideOnScroll: getToggleValue(action, state.hideOnScroll),
      }
    default:
      return state
  }
}
