const defaultState: State = {
  theme: {
    current: 'light',
    useAmoled: false,
    darkAtNight: false,
    useSystem: true,
    manualOverride: false,
    showToggle: true,
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
  useCom: {
    show: false,
    text: '',
    type: 'info',
  },
  subscriptions: [],
  platform: {
    os: null,
    input: 'unknown',
  },
}

export default defaultState
