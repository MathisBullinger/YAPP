import { actions } from './actions'

export function theme(state = 'light', action: actions.Base) {
  switch (action.type) {
    case 'SET_THEME':
      return (action as actions.SetTheme).theme
    case 'TOGGLE_DARK_MODE':
      return ((action as actions.ToggleMode).value !== undefined
      ? (action as actions.ToggleMode).value
      : state === 'light')
        ? 'dark'
        : 'light'
    default:
      return state
  }
}
