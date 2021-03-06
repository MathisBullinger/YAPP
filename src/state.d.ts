interface State {
  theme: {
    current: Themes
    useAmoled: boolean
    darkAtNight: boolean
    useSystem: boolean
    manualOverride: boolean
    showToggle: boolean
  }
  appbar: {
    visible: boolean
    title: string
    actions: AppbarAction[]
    loading: boolean
    hideOnScroll: boolean
  }
  toolbar: {
    visible: boolean
    title: string
    actions: string[]
  }
  podcasts: {
    byId: { [key: string]: Podcast }
    searches: { [key: string]: string[] }
    fetching: boolean
    searching: boolean
  }
  player: {
    visible: boolean
    state: 'idle' | 'waiting' | 'playing' | 'paused'
    fetching: boolean
    currentEpisode: string
    length: number
    progress: number
    progLastUpdate: number
    buffered: number
    lastSeek: number
    volume: number
  }
  useCom: {
    show: boolean
    text: string
    type: 'info' | 'warn' | 'error' | 'request'
  }
  subscriptions: Podcast['id'][]
  platform: {
    os: 'windows'
    input: 'unknown' | 'mouse'
  }
  library: {
    search: string
    order: 'title' | 'custom'
  }
}

interface Podcast {
  id: string
  name: string
  creator: string
  feed: string
  descr: {
    short?: string
    long?: string
  }
  artworks: Artwork[]
  episodes?: Episode[]
  colors: Color[]
  _fetched: boolean
}

interface Episode {
  title: string
  file: string
  date: number
  id: string
  duration: number
  descr: {
    short?: string
    long?: string
  }
  artworks?: Artwork[]
  _fetched: boolean
}

interface Artwork {
  size: number
  url: string
  type: string
}

interface Color {
  name: string
  value: string
}

interface AppbarAction {
  name: string
  align: 'left' | 'right'
}

type Themes = 'light' | 'dark' | 'black'
