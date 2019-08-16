import { actions } from './actions'

export function theme(state = 'light', action: actions.Base) {
  switch (action.type) {
    case 'SET_THEME':
      return (action as actions.SetTheme).theme
    case 'TOGGLE_DARK_MODE':
      return ((action as actions.ToggleAction).value !== undefined
      ? (action as actions.ToggleAction).value
      : state === 'light')
        ? 'dark'
        : 'light'
    default:
      return state
  }
}

export function appbarVisible(state = 'false', action: actions.ToggleAction) {
  if (action.type !== 'TOGGLE_APPBAR') return state
  return action.value !== undefined ? action.value : !state
}
