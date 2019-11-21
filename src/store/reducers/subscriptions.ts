import defaultState from '../defaultState'

export default function subscriptions(
  state = defaultState.subscriptions,
  action: any
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
