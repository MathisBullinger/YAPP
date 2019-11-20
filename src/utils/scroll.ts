import { store } from '~/store'
import { setScrollDirection, setScrollPos } from '~/store/actions'
import throttle from 'lodash/throttle'

const MIN_STEP = 20
let lastOffY: number = null
let lastDY: number = null

const scrollbarTimeout = 500
let lastScroll = performance.now()
let scrollTimeoutId
let scrollbarSubscribers = []
export const scrollbar = {
  subscribe(callback: (boolean) => void) {
    scrollbarSubscribers.push(callback)
  },
  unsubscribe(callback: (boolean) => void) {
    scrollbarSubscribers = scrollbarSubscribers.filter(e => e !== callback)
  },
}

const scrollTimeoutCallback = () => {
  scrollTimeoutId = null
  scrollbarSubscribers.forEach(callback => callback(false))
}

export default throttle(function handleScroll(scrollTop: number) {
  if (lastOffY === 0) {
    lastOffY = scrollTop
    return
  }
  const dy = scrollTop - lastOffY

  store.dispatch(setScrollPos(scrollTop))

  if (Math.abs(dy) >= MIN_STEP)
    if (lastDY !== null || dy > 0 !== lastDY > 0)
      store.dispatch(setScrollDirection(dy > 0 ? 'down' : 'up'))

  if (scrollbarSubscribers.length) {
    const now = performance.now()
    if (now - lastScroll < scrollbarTimeout) {
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId)
      else scrollbarSubscribers.forEach(callback => callback(true))
      scrollTimeoutId = setTimeout(scrollTimeoutCallback, scrollbarTimeout)
    }
    lastScroll = performance.now()
  }

  lastDY = dy
  lastOffY = scrollTop
}, 1000 / 30)
