import defaultState from '../defaultState'

export default function platform(
  state = defaultState['platform'],
  action: any
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
