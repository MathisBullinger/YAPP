import { Themes } from '~/styles/theme'

export type ActionType =
  | 'SET_THEME'
  | 'TOGGLE_DARK_MODE'
  | 'TOGGLE_APPBAR'
  | 'TOGGLE_PREFER_AMOLED'
  | 'TOGGLE_DARK_AT_NIGHT'
  | 'SET_APPBAR_TITLE'
  | 'ADD_APPBAR_ACTION'
  | 'RESET_APPBAR_ACTIONS'
  | 'TOGGLE_HIDE_APPBAR_ON_SCROLL'
  | 'TOGGLE_APPBAR_LOADING'
  | 'TOGGLE_TOOLBAR'
  | 'SET_TOOLBAR_TITLE'
  | 'ADD_TOOLBAR_ACTION'
  | 'RESET_TOOLBAR_ACTIONS'
  | 'SET_SCROLL_DIRECTION'

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

  export interface AppbarAction extends Base {
    name: string
    align: 'left' | 'right'
  }

  export interface ScrollDirAction extends Base {
    value: 'up' | 'down'
  }
}

const action = (type: ActionType) => (): actions.Base => ({ type })
const toggleAction = (type: ActionType) => (
  value?: boolean
): actions.ToggleAction => ({
  type,
  value,
})
const stringAction = (type: ActionType) => (
  value: string
): actions.StringAction => ({ type, value })

export const setTheme = (theme: Themes): actions.SetTheme => ({
  type: 'SET_THEME',
  theme,
})

export const toggleDarkMode = toggleAction('TOGGLE_DARK_MODE')
export const toggleAppbar = toggleAction('TOGGLE_APPBAR')
export const togglePreferAmoled = toggleAction('TOGGLE_PREFER_AMOLED')
export const toggleDarkAtNight = toggleAction('TOGGLE_DARK_AT_NIGHT')
export const setAppbarTitle = stringAction('SET_APPBAR_TITLE')
export const resetAppbarActions = action('RESET_APPBAR_ACTIONS')
export const toggleAppbarLoading = toggleAction('TOGGLE_APPBAR_LOADING')
export const toggleHideAppbarOnScroll = toggleAction(
  'TOGGLE_HIDE_APPBAR_ON_SCROLL'
)
export const toggleToolbar = toggleAction('TOGGLE_TOOLBAR')
export const setToolbarTitle = stringAction('SET_TOOLBAR_TITLE')
export const addToolbarAction = stringAction('ADD_TOOLBAR_ACTION')
export const resetToolbarActions = action('RESET_TOOLBAR_ACTIONS')

export const addAppbarAction = (
  name: string,
  align: 'left' | 'right'
): actions.AppbarAction => ({
  type: 'ADD_APPBAR_ACTION',
  name,
  align,
})

export const setScrollDirection = (
  value: 'up' | 'down'
): actions.ScrollDirAction => ({
  type: 'SET_SCROLL_DIRECTION',
  value,
})
