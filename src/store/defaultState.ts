import State from './state'

const defaultState: Partial<State> = {
  theme: {
    current: 'light',
    useAmoled: false,
    darkAtNight: false,
    manualOverride: false,
  },
  appbar: {
    visible: true,
    hidden: false,
    title: '',
    actions: [],
    loading: false,
    hideOnScroll: false,
  },
  toolbar: {
    visible: false,
    title: '',
    actions: [],
  },
  scroll: {
    direction: null,
  },
  podcasts: {
    byId: {},
    searches: {},
    fetching: false,
    searching: false,
  },
  player: {
    visible: false,
    state: 'idle',
    fetching: false,
    currentEpisode: null,
    progress: 0,
    length: 0,
    buffered: 0,
    progLastUpdate: 0,
  },
}

export default defaultState
