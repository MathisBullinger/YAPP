import { throttle, debounce } from 'lodash'

class ScrollManager {
  constructor() {
    this._events = ['dirchange', 'top']
    this._handlers = this._events.reduce((a, c) => ({ ...a, [c]: [] }), {})
    this._scrollDirListener = throttle(this._scrollDirListener, 1000 / 10).bind(
      this
    )
    this._topListener = debounce(this._topListener, 50, {
      leading: true,
      trailing: true,
    }).bind(this)
    this._customListener = debounce(this._customListener, 50, {
      leading: true,
      trailing: true,
    }).bind(this)
    this._customEdges = []
  }

  addEventListener(event, handler) {
    if (!handler) throw Error('event handler required')
    event = this._parseCustomScrollEvent(event) || event
    if (event.startsWith('above') && !this._events.includes(event)) {
      this._events.push(event)
      this._handlers[event] = []
      this._customEdges.push(parseInt(event.replace('above', '')))
    }
    if (!this._events.includes(event)) throw Error(`unknown event ${event}`)
    if (!this._handlers[event].includes(handler))
      this._handlers[event].push(handler)
    if (!event.startsWith('above') && this._handlers[event].length === 1)
      this._initListener(event)
    else if (
      event.startsWith('above') &&
      Object.entries(this._handlers).reduce(
        (a, c) => (!c[0].startsWith('above') ? a : a + c[1].length),
        0
      ) === 1
    )
      this._initListener(event)
  }

  removeEventListener(event, handler) {
    event = this._parseCustomScrollEvent(event) || event
    if (!this._events.includes(event)) throw Error(`unknown event ${event}`)
    if (this._handlers[event].includes(handler))
      this._handlers[event].splice(this._handlers[event].indexOf(handler), 1)
    if (
      (!event.startsWith('above') && this._handlers[event].length === 0) ||
      (event.startsWith('above') &&
        Object.entries(this._handlers).reduce(
          (a, c) => (!c[0].startsWith('above') ? a : a + c[1].length),
          0
        ) === 0)
    )
      this._stopListener(event)
    if (event.startsWith('above') && this._handlers[event].length === 0)
      this._customEdges.splice(
        this._customEdges.indexOf(parseInt(event.replace('above', '')))
      )
  }

  removeFromAll(handler) {
    Object.entries(this._handlers).forEach(([k, v]) => {
      if (v.includes(handler)) {
        v.splice(v.indexOf(handler))
        if (
          (!k.startsWith('above') && v.length === 0) ||
          (k.startsWith('above') &&
            Object.entries(this._handlers).reduce(
              (a, c) => (!c[0].startsWith('above') ? a : a + c[1].length),
              0
            ) === 0)
        )
          this._stopListener(k)
        if (k.startsWith('above') && v.length === 0)
          this._customEdges.splice(
            this._customEdges.indexOf(parseInt(k.replace('above', '')))
          )
      }
    })
  }

  _initListener(event) {
    console.log('start', event)
    switch (event) {
      case 'dirchange':
        this._lastScrollY = window.scrollY
        window.addEventListener('scroll', this._scrollDirListener, {
          passive: true,
        })
        break
      case 'top':
        this._wasTop = window.scrollY === 0
        window.addEventListener('scroll', this._topListener, {
          passive: true,
        })
        this._handlers.top.forEach(handler => handler(this._wasTop))
        break
      default:
        if (event.startsWith('above')) {
          window.addEventListener('scroll', this._customListener, {
            passive: true,
          })
        }
    }
  }

  _stopListener(event) {
    switch (event) {
      case 'dirchange':
        delete this._lastScrollDelta
        delete this._lastScrollY
        window.removeEventListener('scroll', this._scrollDirListener)
        break
      case 'top':
        delete this._wasTop
        window.removeEventListener('scroll', this._topListener)
        break
      default:
        if (event.startsWith('above')) {
          window.removeEventListener('scroll', this._customListener)
        }
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

  _topListener() {
    const isTop = window.scrollY === 0
    if (isTop !== this._wasTop)
      this._handlers.top.forEach(handler => handler(isTop))
    this._wasTop = isTop
  }

  _customListener() {
    console.log(this._customEdges)
  }

  _parseCustomScrollEvent(str) {
    if (!str.startsWith('above')) return null
    if (!/^\d+$/.test(str.replace('above', ''))) return null
    return 'above' + parseInt(str.replace('above', ''))
  }
}

export default new ScrollManager()
