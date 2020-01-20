// prettier-ignore
export interface Actions {
  SET_THEME:                    { value: Themes }
  TOGGLE_DARK_MODE:             { value: boolean }
  TOGGLE_APPBAR:                { value: boolean }
  TOGGLE_APPBAR_HIDDEN:         { value: boolean }
  TOGGLE_PREFER_AMOLED:         { value: boolean }
  TOGGLE_DARK_AT_NIGHT:         { value: boolean }
  SET_DARK_AT_NIGHT:            { value: boolean }
  TOGGLE_DARK_USE_SYSTEM:       { value: boolean }
  MANUAL_DARK_MODE:             undefined
  SHOW_DARKMODE_TOGGLE:         { value: boolean }
  SET_APPBAR_TITLE:             { value: string }
  ADD_APPBAR_ACTION:            { name: string, align: AppbarAction['align'] }
  RESET_APPBAR_ACTIONS:         undefined
  TOGGLE_HIDE_APPBAR_ON_SCROLL: { value: boolean }
  TOGGLE_APPBAR_LOADING:        { value: boolean }
  TOGGLE_TOOLBAR:               { value: boolean }
  SET_TOOLBAR_TITLE:            { value: string }
  ADD_TOOLBAR_ACTION:           { value: string }
  RESET_TOOLBAR_ACTIONS:        undefined
  SEARCH_PODCAST:               { value: string }
  ADD_PODCAST:                  { value: Podcast }
  ADD_PODCASTS:                 { values: Podcast[] }
  ADD_EPISODE:                  { value: Episode, podId: string }
  ADD_SEARCH_RESULTS:           { search: string, results: Podcast['itunesId'][] }
  TOGGLE_PODCAST_FETCHING:      { value: boolean }
  TOGGLE_PODCAST_SEARCHING:     { value: boolean }
  FETCH_PODCAST:                { value: Podcast['itunesId'], metaOnly?: boolean }
  FETCH_EPISODE:                { value: string }
  FETCH_LIBRARY:                { values: string[] }
  TOGGLE_PLAYER_VISIBLE:        { value: boolean }
  SET_PLAYER_STATE:             { value: State['player']['state'] }
  SET_CURRENT_EPISODE:          { value: string }
  SET_PLAYER_LENGTH:            { value: number }
  SET_PLAYER_PROGRESS:          { value: number }
  SET_PLAYER_BUFFERED:          { value: number }
  SET_PLAYER_FETCHING:          { value: boolean }
  SET_PLAYER_VOLUME:            { value: number }
  SET_LAST_SEEK:                { value: number }
  TOGGLE_USECOM_SHOW:           { value: boolean }
  SET_USECOM_TEXT:              { value: string }
  SET_USECOM_TYPE:              { value: State['useCom']['type'] }
  SET_INTERACTION_METHOD:       { value: State['platform']['input'] }
  SUBSCRIBE:                    { value: string }
  UNSUBSCRIBE:                  { value: string }
  SET_OS:                       { value: State['platform']['os'] }
  SET_SEARCH:                   { value: string }
}

// Action creator. The type of the payload depends on the specified action.
// If the action type has the form { value: ... } the value of the value property
// may directly be passed as payload. If the action type is { value: boolean }, passing
// a payload is optional.

export default function<
  T extends keyof Actions,
  K extends Actions[T] extends { value: any } ? Actions[T]['value'] : never
>(type: T, ...[payload]: CondOpt<Actions[T], K>) {
  return {
    type,
    ...((typeof (payload ?? {}) === 'object' && !Array.isArray(payload)
      ? payload
      : { value: payload }) as Actions[T]),
  } as assemble<T>
}

type CondOpt<T, K> = T extends { value: boolean } ? [(T | K)?] : [T | K]
export type assemble<T extends keyof Actions> = {
  type: T
} & (Actions[T] extends undefined ? {} : Actions[T])
