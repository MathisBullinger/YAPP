import { actions as a } from './actions'

export function appbarVisible(state = true, action: a.ToggleAction) {
  if (action.type !== 'TOGGLE_APPBAR') return state
  return action.value !== undefined ? action.value : !state
}

const defaultTheme = {
  current: 'light',
  useAmoled: false,
}
export function theme(state = defaultTheme, action: a.Base) {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        current: (action as a.SetTheme).theme,
      }
    case 'TOGGLE_DARK_MODE': {
      const dark = state.useAmoled ? 'black' : 'dark'
      return {
        ...state,
        current:
          (action as a.ToggleAction).value !== undefined
            ? (action as a.ToggleAction).value
              ? dark
              : 'light'
            : state.current === 'light'
            ? dark
            : 'light',
      }
    }
    case 'TOGGLE_PREFER_AMOLED': {
      const v = (action as a.ToggleAction).value
        ? (action as a.ToggleAction).value
        : !state.useAmoled
      let current = state.current
      if (state.current === 'dark' && v) current = 'black'
      else if (state.current === 'black' && !v) current = 'dark'
      return {
        ...state,
        current,
        useAmoled: v,
      }
    }
    default:
      return state
  }
}
