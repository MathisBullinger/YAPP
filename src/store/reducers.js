import { SET_THEME, TOGGLE_DARK_MODE } from './actions'

export function theme(state = 'light', action) {
  switch (action.type) {
    case SET_THEME:
      return action.theme
    case TOGGLE_DARK_MODE:
      return state === 'light' ? 'dark' : 'light'
    default:
      return state
  }
}
