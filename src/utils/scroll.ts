import store from '~/store'
import { setScrollDirection, setScrollPos } from '~/store/actions'
import throttle from 'lodash/throttle'

const MIN_STEP = 20
let lastOffY: number = null
let lastDY: number = null

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

  lastDY = dy
  lastOffY = scrollTop
}, 1000 / 30)
