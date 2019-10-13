import store from '.'
import State from './state'
import defaultState from './defaultState'
import { Themes } from '~/styles/theme'

interface Persisted {
  theme: {
    mode: Themes | 'autoNight' | 'system'
    showToggle: boolean
  }
}

window.addEventListener('beforeunload', () => {
  set.theme(store.getState().theme)
})

export const get = {
  theme(): State['theme'] {
    const local = localStorage.getItem('theme')
    return local ? decode.theme(JSON.parse(local)) : defaultState['theme']
  },
}

export const set = {
  theme(theme: State['theme']) {
    localStorage.setItem('theme', JSON.stringify(encode.theme(theme)))
  },
}

const encode = {
  theme: (theme: State['theme']): Persisted['theme'] => ({
    mode: theme.manualOverride
      ? theme.current
      : theme.useSystem
      ? 'system'
      : theme.darkAtNight
      ? 'autoNight'
      : theme.current,
    showToggle: theme.showToggle,
  }),
}

const decode = {
  theme: (theme: Persisted['theme']): State['theme'] => ({
    current:
      theme.mode !== 'autoNight' && theme.mode !== 'system'
        ? theme.mode
        : defaultState.theme.current,
    useAmoled: defaultState.theme.useAmoled,
    darkAtNight: theme.mode === 'autoNight',
    useSystem: theme.mode === 'system',
    manualOverride: false,
    showToggle: theme.showToggle,
  }),
}
