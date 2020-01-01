import defaultState from '../defaultState'
import { assemble as a } from '~/store/actions'

export default function library(
  state = defaultState['library'],
  action: a<'SET_SEARCH'>
) {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.value,
      }
    default:
      return state
  }
}
