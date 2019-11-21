import './styles/master.scss'
import { store, initStore } from '~/store'
import action from '~/store/actions'

import * as Sentry from '@sentry/browser'
Sentry.init({
  dsn: 'https://f253732d670843f0b08015c64bb7587f@sentry.io/1500732',
  environment: process.env.NODE_ENV,
})

import initUI from './Root'
import './api'
import UseCom from '~/systems/useCom'
import { register } from '~/systems'
;(async () => {
  await initStore()

  initUI()
  register(new UseCom())

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        ({ scope }) => console.log('sw registered with scope:', scope),
        err => console.log('sw registration failed:', err)
      )
    })
  }

  if (navigator.platform.startsWith('Win'))
    store.dispatch(action('SET_OS', 'windows'))
})()
