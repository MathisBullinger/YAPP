import * as a from '../actionTypes'
import defaultState from '../defaultState'

export default function subscriptions(
  state = defaultState['subscriptions'],
  action: a.Base
) {
  switch (action.type) {
    case 'SUBSCRIBE':
      return [...state, (action as a.StringAction).value]
    case 'UNSUBSCRIBE':
      return state.filter(id => id !== (action as a.StringAction).value)
    default:
      return state
  }
}
