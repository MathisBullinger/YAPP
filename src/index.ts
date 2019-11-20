import './styles/master.scss'
import { setOS } from '~/store/actions'
import { store, initStore } from '~/store'

import * as Sentry from '@sentry/browser'
Sentry.init({
  dsn: 'https://f253732d670843f0b08015c64bb7587f@sentry.io/1500732',
  environment: process.env.NODE_ENV,
})

import initUI from './Root'
import './api'
import UseCom from '~/systems/useCom'
import Interaction from '~/systems/interaction'
import { register } from '~/systems'
;(async () => {
  await initStore()

  initUI()
  register(new UseCom())
  register(new Interaction())

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        ({ scope }) => console.log('sw registered with scope:', scope),
        err => console.log('sw registration failed:', err)
      )
    })
  }

  if (navigator.platform.startsWith('Win')) store.dispatch(setOS('windows'))
})()
