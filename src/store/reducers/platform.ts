import * as a from '../actionTypes'
import defaultState from '../defaultState'

export default function platform(
  state = defaultState['platform'],
  action: a.Base
) {
  switch (action.type) {
    case 'SET_OS':
      return {
        ...state,
        os: (action as a.StringAction).value,
      }
    case 'SET_INTERACTION_METHOD':
      return {
        ...state,
        input: (action as a.StringAction).value,
      }
    default:
      return state
  }
}
