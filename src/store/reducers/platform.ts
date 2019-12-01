import defaultState from '../defaultState'
import { assemble as a } from '~/store/actions'

export default function platform(
  state = defaultState['platform'],
  action: a<'SET_OS'> | a<'SET_INTERACTION_METHOD'>
) {
  switch (action.type) {
    case 'SET_OS':
      return {
        ...state,
        os: action.value,
      }
    case 'SET_INTERACTION_METHOD':
      return {
        ...state,
        input: action.value,
      }
    default:
      return state
  }
}
