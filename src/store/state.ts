import { Themes } from '~/styles/theme'

export default interface State {
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
    hidden: boolean
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
  }
  useCom: {
    show: boolean
    text: string
    type: 'info' | 'warn' | 'request'
  }
  interaction: {
    method: 'unknown' | 'mouse'
    mousePos: {
      x: number
      y: number
    }
    scrollDir: 'up' | 'down'
    scrollPos: number
  }
}

export interface Podcast {
  itunesId: string
  name: string
  creator: string
  feed: string
  description: string
  artworks: Artwork[]
  episodes: Episode[]
  colors: Color[]
  _fetched: boolean
}

export interface Episode {
  title: string
  file: string
  date: number
  id: string
  duration: number
  description?: string
  content?: string
  artworks?: Artwork[]
  _fetched: boolean
}

export interface Artwork {
  size: number
  url: string
  type: string
}

export interface Color {
  name: string
  value: string
}

export interface AppbarAction {
  name: string
  align: 'left' | 'right'
}
