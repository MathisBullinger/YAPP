import throttle from 'lodash/throttle'
import subscription from './subscription'
import { store } from '~/store'
import action from '~/store/actions'

export const mousePos = subscription<[number, number]>(() => {
  window.addEventListener('mousemove', handleMouseMove)
  return () => window.removeEventListener('mousemove', handleMouseMove)
})

const handleMouseMove = throttle(({ clientX, clientY }) => {
  mousePos._call([clientX, clientY])
}, 1000 / 10)

function mouseMethodHandler() {
  store.dispatch(action('SET_INTERACTION_METHOD', 'mouse'))
  mousePos.unsubscribe(mouseMethodHandler)
}
mousePos.subscribe(mouseMethodHandler)

export const scrollbar = subscription<boolean>()
export const position = subscription<number>()
export const positionRel = subscription<number>()
export const direction = subscription<'down' | 'up'>()

const scrollTimeoutCallback = () => {
  scrollTimeoutId = null
  scrollbar._call(false)
}

const MIN_STEP = 0
let lastOffY: number = null
let lastDY: number = null

const scrollbarTimeout = 500
let lastScroll = performance.now()
let scrollTimeoutId

export const handleScroll = throttle((scrollTop: number) => {
  if (lastOffY === 0) {
    lastOffY = scrollTop
    return
  }
  const dy = scrollTop - lastOffY

  position._call(scrollTop)
  positionRel._call(dy)

  if (Math.abs(dy) >= MIN_STEP)
    if (lastDY !== null || dy > 0 !== lastDY > 0)
      direction._call(dy > 0 ? 'down' : 'up')

  if (scrollbar.requested) {
    const now = performance.now()
    if (now - lastScroll < scrollbarTimeout) {
      if (scrollTimeoutId) clearTimeout(scrollTimeoutId)
      else scrollbar._call(true)
      scrollTimeoutId = setTimeout(scrollTimeoutCallback, scrollbarTimeout)
    }
    lastScroll = performance.now()
  }

  lastDY = dy
  lastOffY = scrollTop
}, 1000 / 30)
