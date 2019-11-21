import defaultState from '../defaultState'
import { assemble as a } from '~/store/actions'

export default function subscriptions(
  state = defaultState.subscriptions,
  action: a<'SUBSCRIBE'> | a<'UNSUBSCRIBE'>
) {
  switch (action.type) {
    case 'SUBSCRIBE':
      return [...state, action.value]
    case 'UNSUBSCRIBE':
      return state.filter(id => id !== action.value)
    default:
      return state
  }
}
