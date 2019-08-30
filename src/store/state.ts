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
  }
  toolbar: {
    visible: boolean
    title: string
    actions: string[]
  }
}
