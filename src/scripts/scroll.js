import { throttle } from 'lodash'

const DEBUG = process.env.NODE_ENV === 'development'

class ScrollMonitor {
  constructor() {
    this._listener = function() {
      this._throttled()
    }.bind(this)

    this._subscribers = {
      scroll: [],
      dirChange: [],
    }
  }

  subscribe(handler, event, minInterval) {
    if (!Object.keys(this._subscribers).includes(event))
      throw Error(`invalid event type ${event}`)

    if (!this._subscribers[event].map(sub => sub.handler).includes(handler))
      this._subscribers[event].push({ handler, interval: minInterval })

    if (!this._interval || minInterval < this._interval)
      this.interval = minInterval

    if (Object.values(this._subscribers).flat().length === 1) this._start()
  }

  unsubscribe(handler, event) {
    if (!Object.keys(this._subscribers).includes(event))
      throw Error(`invalid event type ${event}`)

    const subscriber = this._subscribers[event].find(
      sub => sub.handler === handler
    )
    if (!subscriber) return
    this._subscribers[event].splice(
      this._subscribers[event].indexOf(subscriber),
      1
    )

    if (Object.values(this._subscribers).flat().length === 0) this._stop()

    if (subscriber.interval === this._interval) {
      const newMinInterval = Math.min(
        ...Object.values(this._subscribers)
          .flat()
          .map(sub => sub.interval)
      )
      if (newMinInterval > this._interval) this.interval = newMinInterval
    }
  }

  _start() {
    this._lastY = window.scrollY
    this._lastDeltaY = 0
    window.addEventListener('scroll', this._listener, { passive: true })
    /* eslint-disable-next-line no-console */
    if (DEBUG) console.log(`[ScrollMonitor]: start`)
  }

  _stop() {
    window.removeEventListener('scroll', this._listener)
    delete this._interval
    /* eslint-disable-next-line no-console */
    if (DEBUG) console.log(`[ScrollMonitor]: stop`)
  }

  set interval(v) {
    this._interval = v
    this._throttled = this._createThrottled()
    /* eslint-disable-next-line no-console */
    if (DEBUG) console.log(`[ScrollMonitor]: interval ${v} ms`)
  }

  _createThrottled() {
    return throttle(this._handler, this._interval)
  }

  _handler() {
    const dy = window.scrollY - this._lastY
    this._subscribers.scroll.forEach(sub =>
      sub.handler({ y: window.scrollY, dy })
    )
    if (dy > 0 !== this._lastDeltaY > 0)
      this._subscribers.dirChange.forEach(sub =>
        sub.handler({ y: window.scrollY, dy })
      )
    this._lastY = window.scrollY
    this._lastDeltaY = dy
  }
}

const scrollMonitor = new ScrollMonitor()

class ScrollEvent {
  constructor(listenTo) {
    if (typeof this._action !== 'function')
      throw Error('ScrollEvent must implement action')
    this._listenTo = listenTo
    this._subscribers = []
    this._action = this._action.bind(this)
  }

  subscribe(handler) {
    this._subscribers.push(handler)
    if (this._subscribers.length === 1) this._startListening()
  }
  unsubscribe(handler) {
    this._subscribers = this._subscribers.filter(sub => sub !== handler)
    if (this._subscribers.length === 0) this._stopListening()
  }

  _startListening() {
    scrollMonitor.subscribe(this._action, this._listenTo)
  }
  _stopListening() {
    scrollMonitor.unsubscribe(this._action, this._listenTo)
  }

  _notify(event) {
    this._subscribers.forEach(sub => sub(event))
  }
}

class Scroll extends ScrollEvent {
  constructor() {
    super('scroll')
  }
  _action(e) {
    this._notify(e)
  }
}

class ScrollDir extends ScrollEvent {
  constructor() {
    super('dirChange')
  }
  _action(e) {
    this._notify(e)
  }
}

const events = [new Scroll(), new ScrollDir()]
function getEvent(name) {
  let event = events.find(
    e => e.constructor.name.toLowerCase() === name.toLowerCase()
  )
  if (event) return event
  throw Error(`unknown event ${name}`)
}

export default {
  addEventListener: ({ event, handler }) => {
    if (!event) throw Error('must pass event & handler')
    getEvent(event).subscribe(handler)
  },
  removeEventListener: ({ event, handler }) => {
    if (event) getEvent(event).unsubscribe(handler)
    else events.forEach(e => e.unsubscribe(handler))
  },
}
