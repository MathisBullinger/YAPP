export interface Theme {
  background: Topic
  surface: Topic
  primary: Topic
  secondary?: Topic
  elevationMode: 'shadow' | 'border'
  invertAction: boolean
}

interface Topic {
  color: string
  onHigh?: string
  onMedium?: string
  onDisabled?: string
  on?: string
}

//! all colors must be 6 or 8 digit hex strings
const light: Theme = {
  background: {
    color: '#ffffff',
    onHigh: 'rgba(0, 0, 0, 87%)',
    onMedium: 'rgba(0, 0, 0, 60%)',
    onDisabled: 'rgba(0, 0, 0, 38%)',
  },
  surface: {
    color: '#ffffff',
    on: '#000000',
  },
  primary: {
    color: '#2196f3',
    on: '#000000',
  },
  elevationMode: 'shadow',
  invertAction: false,
}

const dark: Theme = {
  background: {
    color: '#33333c',
    onHigh: '#fffffff2',
    onMedium: '#ffffffb3',
    onDisabled: '#ffffff66',
  },
  surface: {
    color: '#373740',
    onHigh: '#fffffff2',
    onMedium: '#ffffffb3',
    onDisabled: '#ffffff66',
  },
  primary: {
    color: '#4bb4b4',
    on: '#ffffff',
  },
  elevationMode: 'shadow',
  invertAction: true,
}

const themes: { [key: string]: Theme } = {
  light,
  dark,
}

interface TopicAPI {
  color: string
  on(emphasis: 'hight' | 'medium' | 'disabled'): string
}
interface ThemeAPI {
  background: TopicAPI
  surface: TopicAPI
  primary: TopicAPI
  secondary: TopicAPI
  elevationMode: 'shadow' | 'border'
  invertAction: boolean
}

const mapTheme = (theme: Theme) =>
  <ThemeAPI>{
    ...Object.fromEntries(
      Object.entries(theme).map(([k, v]) => [
        k,
        typeof v === 'object'
          ? {
              color: v.color,
              on: (emp = 'high') =>
                ({
                  high: v.onHigh || v.on,
                  medium: v.onMedium || v.on,
                  disabled: v.onDisabled || v.on,
                }[emp]),
            }
          : v,
      ])
    ),
  }

export default (theme: 'light' | 'dark'): ThemeAPI => mapTheme(themes[theme])
