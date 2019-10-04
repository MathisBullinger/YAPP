import store from '~/store'
import {
  setPlayerState,
  setPlayerFetching,
  setPlayerLength,
  setPlayerProgress,
} from '~/store/actions'

export default class StateManager {
  private el: HTMLAudioElement
  private handlers: { [e: string]: () => void } = {}
  private playbackTime = 0
  private lastTimeUpdate: number

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
    console.log('paused')
    this.playbackTime += performance.now() - this.lastTimeUpdate
    this.lastTimeUpdate = performance.now()
    this.stopUpdateProgress()
  }

  private onDurationChange({ timeStamp }) {
    store.dispatch(setPlayerLength(timeStamp))
  }

  private onEmptied() {
    this.playbackTime = 0
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
  private getProgress() {
    return store.getState().player.state === 'playing'
      ? this.playbackTime + (performance.now() - this.lastTimeUpdate)
      : this.playbackTime
  }
  public jump(dt) {
    if (-dt > this.playbackTime) dt = -this.playbackTime
    this.playbackTime += dt
  }
}
