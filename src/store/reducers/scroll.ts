import { actions as a } from '../actions'
import State from '../state'

const defaultState: State['scroll'] = {
  direction: null,
}
export default function scroll(
  state: State['scroll'] = defaultState,
  action: a.Base
) {
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
