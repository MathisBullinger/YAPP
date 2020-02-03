import './styles/master.scss'
import { store, initStore } from '~/store'
import action from '~/store/actions'

import * as Sentry from '@sentry/browser'

performance.mark('app start')

Sentry.init({
  dsn: 'https://f253732d670843f0b08015c64bb7587f@sentry.io/1500732',
  environment: process.env.NODE_ENV,
  release: `yapp@${process.env.VERSION ?? 'unknown'}`,
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      ({ scope }) => console.log('sw registered with scope:', scope),
      err => console.log('sw registration failed:', err)
    )
  })
}

import initUI from './Root'
import './api'
import UseCom from '~/systems/useCom'
import { register } from '~/systems'
;(async () => {
  performance.mark('store')
  await initStore()
  performance.measure('store')
  console.log(
    `store in ${performance.getEntriesByName('store').shift()?.duration} ms`
  )

  initUI()
  register(new UseCom())

  if (navigator.platform.startsWith('Win'))
    store.dispatch(action('SET_OS', 'windows'))

  performance.measure('app start')
  console.log(
    `setup in ${performance.getEntriesByName('app start').shift()?.duration} ms`
  )
})()
