import { Themes } from '~/styles/theme'
import * as a from './actionTypes'
import State, { Podcast, Episode } from './state'

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
const numberAction = (type: a.ActionType) => (
  value: number
): a.NumberAction => ({ type, value })
const numbersAction = (type: a.ActionType) => (
  ...values: number[]
): a.NumbersAction => ({ type, values })

export const setTheme = (theme: Themes): a.SetTheme => ({
  type: 'SET_THEME',
  theme,
})

export const toggleDarkMode = toggleAction('TOGGLE_DARK_MODE')
export const toggleAppbar = toggleAction('TOGGLE_APPBAR')
export const toggleAppbarHidden = toggleAction('TOGGLE_APPBAR_HIDDEN')
export const togglePreferAmoled = toggleAction('TOGGLE_PREFER_AMOLED')
export const toggleDarkAtNight = toggleAction('TOGGLE_DARK_AT_NIGHT')
export const setDarkAtNight = toggleAction('SET_DARK_AT_NIGHT')
export const toggleDarkUseSystem = toggleAction('TOGGLE_DARK_USE_SYSTEM')
export const manualDarkmode = action('MANUAL_DARK_MODE')
export const showDarkmodeToggle = toggleAction('SHOW_DARKMODE_TOGGLE')
export const setAppbarTitle = stringAction('SET_APPBAR_TITLE')
export const resetAppbarActions = action('RESET_APPBAR_ACTIONS')
export const toggleAppbarLoading = toggleAction('TOGGLE_APPBAR_LOADING')
export const toggleHideAppbarOnScroll = toggleAction(
  'TOGGLE_HIDE_APPBAR_ON_SCROLL'
)
export const setScrollPos = numberAction('SET_SCROLL_POS')
export const toggleToolbar = toggleAction('TOGGLE_TOOLBAR')
export const setToolbarTitle = stringAction('SET_TOOLBAR_TITLE')
export const addToolbarAction = stringAction('ADD_TOOLBAR_ACTION')
export const resetToolbarActions = action('RESET_TOOLBAR_ACTIONS')
export const searchPodcast = stringAction('SEARCH_PODCAST')
export const togglePodcastFetching = toggleAction('TOGGLE_PODCAST_FETCHING')
export const togglePodcastSearching = toggleAction('TOGGLE_PODCAST_SEARCHING')
export const fetchPodcast = stringAction('FETCH_PODCAST')
export const fetchEpisode = stringAction('FETCH_EPISODE')
export const togglePlayerVisible = toggleAction('TOGGLE_PLAYER_VISIBLE')
export const setCurrentEpisode = stringAction('SET_CURRENT_EPISODE')
export const setPlayerLength = numberAction('SET_PLAYER_LENGTH')
export const setPlayerProgress = numberAction('SET_PLAYER_PROGRESS')
export const setPlayerBuffered = numberAction('SET_PLAYER_BUFFERED')
export const setPlayerFetching = toggleAction('SET_PLAYER_FETCHING')
export const toggleUsecomShow = toggleAction('TOGGLE_USECOM_SHOW')
export const setMousePos = numbersAction('SET_MOUSE_POS')
export const setInteractionMethod = stringAction('SET_INTERACTION_METHOD')

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

export const addPodcast = (value: Podcast): a.PodcastAction => ({
  type: 'ADD_PODCAST',
  value,
})

export const addEpisode = (
  value: Partial<Episode>,
  podId: string
): a.EpisodeAction => ({
  type: 'ADD_EPISODE',
  value,
  podId,
})

export const addSearchResults = (
  search: string,
  results: string[]
): a.SearchResultAction => ({
  type: 'ADD_SEARCH_RESULTS',
  search,
  results,
})

export const setPlayerState = (
  value: State['player']['state']
): a.PlayerStateAction => ({ type: 'SET_PLAYER_STATE', value })
