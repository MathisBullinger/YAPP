import defaultState from '../defaultState'
import { getToggleValue } from './utils'

export default function useCom(state = defaultState['useCom'], action: any) {
  switch (action.type) {
    case 'TOGGLE_USECOM_SHOW':
      return {
        ...state,
        show: getToggleValue(action, state.show),
      }
    case 'SET_USECOM_TEXT':
      return {
        ...state,
        text: action.value,
      }
    case 'SET_USECOM_TYPE':
      return {
        ...state,
        type: action.value,
      }
    default:
      return state
  }
}
