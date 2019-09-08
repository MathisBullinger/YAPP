import { Themes } from '~/styles/theme'
import * as a from './actionTypes'

const action = (type: a.ActionType) => (): a.Base => ({ type })
const toggleAction = (type: a.ActionType) => (
  value?: boolean
): a.ToggleAction => ({
  type,
  value,
})
const stringAction = (type: a.ActionType) => (
  value: string
): a.StringAction => ({ type, value })

export const setTheme = (theme: Themes): a.SetTheme => ({
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
export const searchPodcast = stringAction('SEARCH_PODCAST')

export const addAppbarAction = (
  name: string,
  align: 'left' | 'right'
): a.AppbarAction => ({
  type: 'ADD_APPBAR_ACTION',
  name,
  align,
})

export const setScrollDirection = (
  value: 'up' | 'down'
): a.ScrollDirAction => ({
  type: 'SET_SCROLL_DIRECTION',
  value,
})
