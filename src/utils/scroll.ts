import store from '~/store'
import { setScrollDirection } from '~/store/actions'

export function startScrollMonitor() {
  console.log('start scroll monitor')
  console.log(store.dispatch(setScrollDirection('up')))
}

export function stopScrollMonitor() {
  console.log('stop scroll monitor')
}
