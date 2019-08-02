import { throttle, debounce } from 'lodash'

class ScrollMonitor {
  constructor() {
    this.interval = 100
    this._listener = function() {
      this._throttled()
    }.bind(this)
  }

  start() {
    window.addEventListener('scroll', this._listener, { passive: true })
  }

  stop() {
    window.removeEventListener('scroll', this._listener)
  }

  set interval(v) {
    this._interval = v
    this._throttled = this._createThrottled()
  }

  _createThrottled() {
    return throttle(this._handler, this._interval)
  }

  _handler() {
    console.log('scroll')
  }
}

const scrollMonitor = new ScrollMonitor()

scrollMonitor.start()
setTimeout(() => (scrollMonitor.interval = 1000), 2000)
setTimeout(() => scrollMonitor.stop(), 5000)

export default {
  addEventListener: ({ event, handler }) => {},
  removeEventListener: ({ event, handler }) => {},
}
