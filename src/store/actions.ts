// action types
export const SET_THEME = 'SET_THEME'
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'

// action creators
export function setTheme(theme) {
  return {
    type: SET_THEME,
    theme,
  }
}

export function toggleDarkMode() {
  return {
    type: TOGGLE_DARK_MODE,
  }
}
