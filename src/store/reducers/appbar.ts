import * as a from '../actionTypes'
import State from '../state'
import { getToggleValue } from './utils'
import defaultState from '../defaultState'

export default function appbar(
  state = defaultState['appbar'],
  action: a.Base
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
        title: (action as a.StringAction).value,
      }
    case 'ADD_APPBAR_ACTION':
      return {
        ...state,
        ...{
          actions: [
            {
              name: (action as a.AppbarAction).name,
              align: (action as a.AppbarAction).align,
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
