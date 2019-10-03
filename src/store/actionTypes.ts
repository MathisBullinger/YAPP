import { Themes } from '~/styles/theme'
import { Podcast } from './state'
import State from '~/store/state'

export type ActionType =
  | 'SET_THEME'
  | 'TOGGLE_DARK_MODE'
  | 'TOGGLE_APPBAR'
  | 'TOGGLE_PREFER_AMOLED'
  | 'TOGGLE_DARK_AT_NIGHT'
  | 'MANUAL_DARK_MODE'
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
  | 'SEARCH_PODCAST'
  | 'ADD_PODCAST'
  | 'ADD_SEARCH_RESULTS'
  | 'TOGGLE_PODCAST_FETCHING'
  | 'FETCH_PODCAST'
  | 'TOGGLE_PLAYER_VISIBLE'
  | 'SET_PLAYER_STATE'
  | 'SET_CURRENT_EPISODE'
  | 'SET_PLAYER_LENGTH'
  | 'SET_PLAYER_PROGRESS'
  | 'SET_PLAYER_BUFFERED'

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

export interface NumberAction extends Base {
  value: number
}

export interface AppbarAction extends Base {
  name: string
  align: 'left' | 'right'
}

export interface ScrollDirAction extends Base {
  value: 'up' | 'down'
}

export interface PodcastAction extends Base {
  value: Podcast
}

export interface SearchResultAction extends Base {
  search: string
  results: string[]
}

export interface PlayerStateAction extends Base {
  value: State['player']['state']
}
