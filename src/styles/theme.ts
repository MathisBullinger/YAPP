interface Theme {
  background: Topic
  surface: Topic
  primary: Topic
  secondary?: Topic
}

interface Topic {
  color: string
  on: string
}

const light: Theme = {
  background: {
    color: '#fff',
    on: '#000',
  },
  surface: {
    color: '#fff',
    on: '#000',
  },
  primary: {
    color: '#55f',
    on: '#000',
  },
}

const dark: Theme = {
  background: {
    color: '#333',
    on: '#fff',
  },
  surface: {
    color: '#333',
    on: '#fff',
  },
  primary: {
    color: '#006',
    on: '#fff',
  },
}

const themes: { [key: string]: Theme } = {
  light,
  dark,
}

export default (theme: 'light' | 'dark'): Theme => themes[theme]
