import store from '.'
import State from './state'
import defaultState from './defaultState'
import { Themes } from '~/styles/theme'

interface Persisted {
  theme: Themes | 'autoNight' | 'system'
}

window.addEventListener('beforeunload', () => {
  set.theme(store.getState().theme)
})

export const get = {
  theme(): State['theme'] {
    const local = localStorage.getItem('theme') as Persisted['theme']
    return local ? decode.theme(local) : defaultState['theme']
  },
}

export const set = {
  theme(theme: State['theme']) {
    localStorage.setItem('theme', encode.theme(theme))
  },
}

const encode = {
  theme: (theme: State['theme']): Persisted['theme'] =>
    theme.manualOverride
      ? theme.current
      : theme.useSystem
      ? 'system'
      : theme.darkAtNight
      ? 'autoNight'
      : theme.current,
}

const decode = {
  theme: (theme: Persisted['theme']): State['theme'] => ({
    current:
      theme !== 'autoNight' && theme !== 'system'
        ? theme
        : defaultState.theme.current,
    useAmoled: defaultState.theme.useAmoled,
    darkAtNight: theme === 'autoNight',
    useSystem: defaultState.theme.useSystem,
    manualOverride: false,
  }),
}
