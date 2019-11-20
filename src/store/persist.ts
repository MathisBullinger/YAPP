import { store } from '.'
import defaultState from './defaultState'

interface Persisted {
  theme: {
    mode: Themes | 'autoNight' | 'system'
    showToggle: boolean
  }
  subscriptions: State['subscriptions']
}

window.addEventListener('beforeunload', () => {
  set.theme(store.getState().theme)
  set.subscriptions(store.getState().subscriptions)
})

export const get = {
  theme(): State['theme'] {
    const local = localStorage.getItem('theme')
    return local ? decode.theme(JSON.parse(local)) : defaultState['theme']
  },
  subscriptions(): State['subscriptions'] {
    const local = localStorage.getItem('subscriptions')
    return local ? JSON.parse(local) : defaultState['subscriptions']
  },
}

export const set = {
  theme(theme: State['theme']) {
    localStorage.setItem('theme', JSON.stringify(encode.theme(theme)))
  },
  subscriptions(subscriptions: State['subscriptions']) {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
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
