import './styles/master.scss'
import './Root'
import './api'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(
        ({ scope }) => console.log('sw registered with scope:', scope),
        err => console.log('sw registration failed:', err)
      )
  })
}
