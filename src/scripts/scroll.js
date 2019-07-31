import { throttle } from 'lodash'

class ScrollManager {
  constructor() {
    this._events = ['dirchange']
    this._handlers = this._events.reduce((a, c) => ({ ...a, [c]: [] }), {})
    this._scrollDirListener = throttle(this._scrollDirListener, 1000 / 10).bind(
      this
    )
  }

  addEventListener(event, handler) {
    if (!this._events.includes(event)) throw Error(`unknown event ${event}`)
    if (!this._handlers[event].includes(handler))
      this._handlers[event].push(handler)
    if (this._handlers[event].length === 1) this._initListener(event)
  }

  removeEventListener(event, handler) {
    if (!this._events.includes(event)) throw Error(`unknown event ${event}`)
    if (this._handlers[event].includes(handler))
      this._handlers[event].splice(this._handlers[event].indexOf(event), 1)
    if (this._handlers[event].length === 0) this._stopListener(event)
  }

  _initListener(event) {
    switch (event) {
      case 'dirchange':
        this._lastScrollY = window.scrollY
        window.addEventListener('scroll', this._scrollDirListener, {
          passive: true,
        })
        break
    }
  }

  _stopListener(event) {
    switch (event) {
      case 'dirchange':
        delete this._lastScrollDelta
        delete this._lastScrollY
        window.removeEventListener('scroll', this._scrollDirListener)
        break
    }
  }

  _scrollDirListener() {
    const scrollDelta = window.scrollY - this._lastScrollY
    this._lastScrollY = window.scrollY
    if (scrollDelta === 0) return

    if (!this._lastScrollDelta || scrollDelta > 0 !== this._lastScrollDelta > 0)
      this._handlers.dirchange.forEach(handler => handler(scrollDelta))

    this._lastScrollDelta = scrollDelta
  }
}

export default new ScrollManager()
