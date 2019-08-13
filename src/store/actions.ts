import { Theme } from '~/styles/theme'

// action types
export const SET_THEME = 'SET_THEME'
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'

// action creators
export function setTheme(theme: Theme) {
  return {
    type: SET_THEME,
    theme,
  }
}

export function toggleDarkMode(value: boolean = null) {
  return {
    type: TOGGLE_DARK_MODE,
    value,
  }
}
