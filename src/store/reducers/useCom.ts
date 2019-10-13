import * as a from '../actionTypes'
import defaultState from '../defaultState'
import { getToggleValue } from './utils'

export default function useCom(state = defaultState['useCom'], action: a.Base) {
  switch (action.type) {
    case 'TOGGLE_USECOM_SHOW':
      return {
        ...state,
        show: getToggleValue(action, state.show),
      }
    case 'SET_USECOM_TEXT':
      return {
        ...state,
        text: (action as a.StringAction).value,
      }
    case 'SET_USECOM_TYPE':
      return {
        ...state,
        type: (action as a.StringAction).value,
      }
    default:
      return state
  }
}
