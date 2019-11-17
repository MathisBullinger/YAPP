import './styles/master.scss'

import * as Sentry from '@sentry/browser'
Sentry.init({
  dsn: 'https://f253732d670843f0b08015c64bb7587f@sentry.io/1500732',
  environment: process.env.NODE_ENV,
})

import './Root'
import './api'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      ({ scope }) => console.log('sw registered with scope:', scope),
      err => console.log('sw registration failed:', err)
    )
  })
}
