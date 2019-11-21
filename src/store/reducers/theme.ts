import { getToggleValue } from './utils'
import defaultState from '../defaultState'

export default function theme(
  state = defaultState.theme,
  action: any
): State['theme'] {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        current: action.theme,
      }
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        current:
          action.value ?? state.current === 'light'
            ? state.useAmoled
              ? 'black'
              : 'dark'
            : 'light',
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
    case 'SET_DARK_AT_NIGHT': {
      const v = getToggleValue(action, state.darkAtNight)
      return {
        ...state,
        darkAtNight: v,
        useSystem: !v ? state.useSystem : false,
        manualOverride: !v ? state.manualOverride : false,
      }
    }
    case 'TOGGLE_DARK_USE_SYSTEM': {
      const v = getToggleValue(action, state.useSystem)
      return {
        ...state,
        useSystem: v,
        darkAtNight: !v ? state.darkAtNight : false,
        manualOverride: !v ? state.manualOverride : false,
      }
    }
    case 'MANUAL_DARK_MODE':
      return {
        ...state,
        manualOverride: true,
        darkAtNight: false,
        useSystem: false,
      }
    case 'SHOW_DARKMODE_TOGGLE':
      return {
        ...state,
        showToggle: getToggleValue(action, state.showToggle),
      }
    default:
      return state
  }
}
