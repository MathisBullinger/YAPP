import { Themes } from '~/styles/theme'

export interface AppbarAction {
  name: string
  align: 'left' | 'right'
}

export default interface State {
  theme: {
    current: Themes
    useAmoled: boolean
    darkAtNight: boolean
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
  scroll: {
    direction: 'up' | 'down'
  }
  podcasts: {
    byId: { [key: string]: Podcast }
    searches: { [key: string]: string[] }
    fetching: boolean
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
}

export interface Episode {
  title: string
  artworks: Artwork[]
  file: string
}

export interface Artwork {
  size: number
  url: string
  type: string
}
