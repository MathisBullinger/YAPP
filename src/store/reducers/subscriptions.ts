import { assemble as a } from '~/store/actions'
import { setup } from './utils'

export default setup('subscriptions', 'ids', function(
  state,
  action: a<'SUBSCRIBE'> | a<'UNSUBSCRIBE'>
) {
  switch (action.type) {
    case 'SUBSCRIBE':
      return state.includes(action.value) ? state : [...state, action.value]
    case 'UNSUBSCRIBE':
      return state.filter(id => id !== action.value)
    default:
      return state
  }
})
