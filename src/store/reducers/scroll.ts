import * as a from '../actionTypes'
import defaultState from '../defaultState'

export default function scroll(state = defaultState['scroll'], action: a.Base) {
  switch (action.type) {
    case 'SET_SCROLL_DIRECTION':
      return {
        ...state,
        direction: (action as a.ScrollDirAction).value,
      }
    default:
      return state
  }
}
