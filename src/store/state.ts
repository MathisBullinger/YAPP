import { Themes } from '~/styles/theme'

export default interface State {
  theme: {
    current: Themes
    useAmoled: boolean
    darkAtNight: boolean
  }
  appbar: {
    visible: boolean
    title: string
  }
}
