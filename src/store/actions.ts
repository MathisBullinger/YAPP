import { Themes } from '~/styles/theme'

export type ActionType = 'SET_THEME' | 'TOGGLE_DARK_MODE'

export namespace actions {
  export interface Base {
    type: ActionType
  }

  export interface SetTheme extends Base {
    theme: Themes
  }

  export interface ToggleMode extends Base {
    value?: boolean
  }
}

export const setTheme = (theme: Themes): actions.SetTheme => ({
  type: 'SET_THEME',
  theme,
})

export const toggleDarkMode = (value?: boolean): actions.ToggleMode => ({
  type: 'TOGGLE_DARK_MODE',
  value,
})
