export enum Themes {
  LIGHT,
  DARK,
}

interface Theme {
  clBackground: string
}

const themes: { [key: number]: Theme } = {
  [Themes.LIGHT]: {
    clBackground: '#fff',
  },
  [Themes.DARK]: {
    clBackground: '#333',
  },
}

export default (name: Themes): Theme => {
  if (name in themes) return themes[name]
  return themes[Themes.LIGHT]
}
