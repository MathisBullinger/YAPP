import { TextEmp } from './typography'

export interface Theme {
  name: string
  background(version?: number): Topic
  surface(version?: number): Topic
  primary(version?: number): Topic
  warning(version?: number): Topic
  elevationMode: 'shadow' | 'border'
  invertAction: boolean
}

interface Topic {
  color: string
  onHigh?: string
  onMedium?: string
  onDisabled?: string
  on(emphasis: TextEmp): string
}

//! all colors must be 6 or 8 digit hex strings

namespace light {
  const empOp = { high: 'de', medium: '99', disabled: '61' }
  const empOpLight = { high: 'f2', medium: 'b3', disabled: '66' }
  export const theme: Theme = {
    name: 'light',
    background: () => ({
      color: '#ffffff',
      on: (e = 'medium') => '#000000' + empOp[e],
    }),
    surface: (v = 0) =>
      [
        {
          color: '#ffffff',
          on: (e = 'medium') => '#000000' + empOp[e],
        },
        {
          color: '#202124',
          on: (e = 'medium') => '#ffffff' + empOpLight[e],
        },
      ][Math.min(v, 1)],
    primary: () => ({
      color: '#fb8c00',
      on: (e = 'medium') => '#ffffff' + empOpLight[e],
    }),
    warning: () => ({
      color: '#ffd600',
      on: (e = 'high') => '#000000' + empOp[e],
    }),
    elevationMode: 'shadow',
    invertAction: false,
  }
}

namespace dark {
  const empOp = { high: 'f2', medium: 'b3', disabled: '66' }
  const empOpDark = { high: 'de', medium: '99', disabled: '61' }
  export const theme: Theme = {
    name: 'dark',
    background: () => ({
      color: '#33333c',
      on: (e = 'medium') => '#ffffff' + empOp[e],
    }),
    surface: () => ({
      color: '#373740',
      on: (e = 'medium') => '#ffffff' + empOp[e],
    }),
    primary: () => ({
      color: '#4bb4b4',
      on: (e = 'medium') => '#000000' + empOpDark[e],
    }),
    warning: () => ({
      color: '#ffff00',
      on: (e = 'high') => '#ffffff' + empOp[e],
    }),
    elevationMode: 'shadow',
    invertAction: true,
  }
}

namespace black {
  const empOp = { high: 'de', medium: '99', disabled: '61' }
  export const theme: Theme = {
    name: 'black',
    background: () => ({
      color: '#000000',
      on: (e = 'medium') => '#ffffff' + empOp[e],
    }),
    surface: () => ({
      color: '#111111',
      on: (e = 'medium') => '#ffffff' + empOp[e],
    }),
    primary: () => ({
      color: '#4bb4b4',
      on: (e = 'medium') => '#ffffff' + empOp[e],
    }),
    warning: () => ({
      color: '#ffff00',
      on: (e = 'high') => '#ffffff' + empOp[e],
    }),
    elevationMode: 'border',
    invertAction: true,
  }
}

const themes: { [key: string]: Theme } = {
  light: light.theme,
  dark: dark.theme,
  black: black.theme,
}

export default (theme: Themes): Theme => themes[theme]
