import store from '~/store'
import {
  setPlayerState,
  setPlayerFetching,
  setPlayerProgress,
  setPlayerBuffered,
} from '~/store/actions'

export default class StateManager {
  private el: HTMLAudioElement
  private handlers: { [e: string]: () => void } = {}
  private playbackTime = 0
  private lastTimeUpdate: number
  private buffers = []

  constructor() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(key => {
      if (key.startsWith('on') && typeof this[key] === 'function')
        this.handlers[key.substring(2).toLowerCase()] = this[key].bind(this)
    })
    this.updateProgress = this.updateProgress.bind(this)
  }

  public connect(el: HTMLAudioElement) {
    this.el = el
    Object.entries(this.handlers).forEach(([event, handler]) =>
      (<any>this.el.addEventListener)(event, handler)
    )
  }

  public disconnect() {
    Object.entries(this.handlers).forEach(([event, handler]) =>
      (<any>this.el.removeEventListener)(event, handler)
    )
    this.el = null
  }

  private onSeeking() {
    this.playbackTime += performance.now() - this.lastTimeUpdate
    this.lastTimeUpdate = performance.now()
    this.stopUpdateProgress()
    store.dispatch(setPlayerFetching(true))
  }

  private onSeeked() {
    store.dispatch(setPlayerFetching(false))
  }

  private onPlay() {
    store.dispatch(setPlayerState('waiting'))
    store.dispatch(setPlayerFetching(true))
  }

  private onPlaying() {
    store.dispatch(setPlayerState('playing'))
    store.dispatch(setPlayerFetching(false))
    this.lastTimeUpdate = performance.now()
    this.startUpdateProgress()
  }

  private onPause() {
    store.dispatch(setPlayerState('paused'))
    this.playbackTime += performance.now() - this.lastTimeUpdate
    this.lastTimeUpdate = performance.now()
    this.stopUpdateProgress()
  }

  private onProgress() {
    const buffered = Math.max(
      0,
      ...new Array(this.el.buffered.length)
        .fill(0)
        .map((_, i) => this.el.buffered.end(i))
    )
    store.dispatch(setPlayerBuffered(buffered))
  }

  private onEmptied() {
    this.playbackTime = 0
    this.buffers = []
  }

  updateInterval: number
  private updateProgress() {
    store.dispatch(setPlayerProgress(this.getProgress() / 1000))
  }
  private startUpdateProgress() {
    if (this.updateInterval) this.stopUpdateProgress()
    this.updateProgress()
    this.updateInterval = setInterval(this.updateProgress, 1000)
  }
  private stopUpdateProgress() {
    if (!this.updateInterval) return
    this.updateProgress()
    clearInterval(this.updateInterval)
    this.updateInterval = null
  }
  public getProgress() {
    return store.getState().player.state === 'playing'
      ? this.playbackTime + (performance.now() - this.lastTimeUpdate)
      : this.playbackTime
  }
  public jump(dt) {
    if (-dt > this.playbackTime) dt = -this.playbackTime
    this.playbackTime += dt
  }
}
