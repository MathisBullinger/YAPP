export interface Theme {
  background: Topic
  surface: Topic
  primary: Topic
  secondary?: Topic
  elevationMode: 'shadow' | 'border'
}

interface Topic {
  color: string
  onHigh?: string
  onMedium?: string
  onDisabled?: string
  on?: string
}

const light: Theme = {
  background: {
    color: '#fff',
    onHigh: 'rgba(0, 0, 0, 87%)',
    onMedium: 'rgba(0, 0, 0, 60%)',
    onDisabled: 'rgba(0, 0, 0, 38%)',
  },
  surface: {
    color: '#fff',
    on: '#000',
  },
  primary: {
    color: '#55f',
    on: '#000',
  },
  elevationMode: 'shadow',
}

const dark: Theme = {
  background: {
    color: '#32323b',
    on: '#fff',
  },
  surface: {
    color: '#37373f',
    on: '#fff',
  },
  primary: {
    color: '#006',
    on: '#fff',
  },
  elevationMode: 'border',
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
}

const mapTheme = (theme: Theme) =>
  <ThemeAPI>{
    ...Object.fromEntries(
      Object.entries(theme).map(([k, v]) => [
        k,
        typeof v === 'object'
          ? {
              color: v.color,
              on: emp =>
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
