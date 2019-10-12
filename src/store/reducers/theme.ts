import * as a from '../actionTypes'
import State from '../state'
import { getToggleValue } from './utils'
import defaultState from '../defaultState'

export default function theme(
  state = defaultState['theme'],
  action: a.Base
): State['theme'] {
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
      const v = getToggleValue(action, state.useAmoled)
      let current = state.current
      if (state.current === 'dark' && v) current = 'black'
      else if (state.current === 'black' && !v) current = 'dark'
      return {
        ...state,
        current,
        useAmoled: v,
      }
    }
    case 'TOGGLE_DARK_AT_NIGHT':
      return {
        ...state,
        darkAtNight: getToggleValue(action, state.darkAtNight),
      }
    case 'MANUAL_DARK_MODE':
      return {
        ...state,
        manualOverride: true,
      }
    default:
      return state
  }
}
