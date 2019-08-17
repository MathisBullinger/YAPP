import { Themes } from '~/styles/theme'

export type ActionType =
  | 'SET_THEME'
  | 'TOGGLE_DARK_MODE'
  | 'TOGGLE_APPBAR'
  | 'TOGGLE_PREFER_AMOLED'
  | 'TOGGLE_DARK_AT_NIGHT'
  | 'SET_APPBAR_TITLE'

export namespace actions {
  export interface Base {
    type: ActionType
  }

  export interface SetTheme extends Base {
    theme: Themes
  }

  export interface ToggleAction extends Base {
    value?: boolean
  }

  export interface StringAction extends Base {
    value: string
  }
}

export const setTheme = (theme: Themes): actions.SetTheme => ({
  type: 'SET_THEME',
  theme,
})

export const toggleDarkMode = (value?: boolean): actions.ToggleAction => ({
  type: 'TOGGLE_DARK_MODE',
  value,
})

export const toggleAppbar = (value?: boolean): actions.ToggleAction => ({
  type: 'TOGGLE_APPBAR',
  value,
})

export const togglePreferAmoled = (value?: boolean): actions.ToggleAction => ({
  type: 'TOGGLE_PREFER_AMOLED',
  value,
})

export const toggleDarkAtNight = (value?: boolean): actions.ToggleAction => ({
  type: 'TOGGLE_DARK_AT_NIGHT',
  value,
})

export const setAppbarTitle = (value: string): actions.StringAction => ({
  type: 'SET_APPBAR_TITLE',
  value,
})
