import { System } from '.'
import StateManager from './audio/StateManager'
import store from '~/store'
import {
  setCurrentEpisode,
  setPlayerProgress,
  setPlayerLength,
} from '~/store/actions'

export default class Audio implements System {
  public readonly name = 'audio'
  private static readonly publicActions = [
    'connect',
    'disconnect',
    'play',
    'pause',
    'resume',
    'jump',
    'goto',
    'setVolume',
  ]

  private static readonly proxy =
    process.env.NODE_ENV === 'production'
      ? 'https://proxy.bullinger.dev/'
      : 'http://localhost:8081/'

  private audioEl: HTMLAudioElement
  private context: AudioContext
  private readonly state = new StateManager()
  private track: MediaElementAudioSourceNode
  private gainNode: GainNode

  private currentAction = Promise.resolve()

  public msg(action: string, ...payload: any) {
    if (!Audio.publicActions.includes(action)) return
    this.currentAction = this.currentAction.then(() => {
      if (!action.includes('connect')) {
        if (!this.audioEl) return console.warn('ignore', action)
        if (!this.context) this.createContext()
      }
      return this[action](...payload) || Promise.resolve()
    })
  }

  public connect(el: HTMLAudioElement) {
    this.audioEl = el
    this.state.connect(el)
  }

  public disconnect() {
    this.audioEl = null
    this.state.disconnect()
  }

  public async play(episodeId: string) {
    const episode = this.getEpisode(episodeId)
    if (!episode) return

    store.dispatch(setCurrentEpisode(episodeId))
    store.dispatch(setPlayerLength(episode.duration))
    store.dispatch(setPlayerProgress(0))

    this.audioEl.src = Audio.proxy + episode.file
    await this.audioEl.play()
  }

  public pause() {
    if (this.audioEl.readyState === 0) return
    this.audioEl.pause()
  }

  public resume() {
    if (this.audioEl.readyState === 0) return
    this.audioEl.play()
  }

  public jump(direction: 'forward' | 'backward') {
    if (this.audioEl.readyState === 0) return
    const dt = direction === 'forward' ? 30 : -10
    this.audioEl.currentTime += dt
    this.state.jump(dt * 1000)
  }

  public goto(seconds: number) {
    if (this.audioEl.readyState === 0) return
    const dt = seconds - this.state.getProgress() / 1000
    this.audioEl.currentTime += dt
    this.state.jump(dt * 1000)
  }

  public setVolume(volume: number) {
    this.gainNode.gain.value = volume
  }

  private createContext() {
    this.context = new (window.AudioContext ||
      (<any>window).webkitAudioContext)()
    this.track = this.context.createMediaElementSource(this.audioEl)
    this.gainNode = this.context.createGain()
    this.track.connect(this.gainNode).connect(this.context.destination)
    this.gainNode.gain.value = 0.15
  }

  private getEpisode(episodeId: string) {
    if (!episodeId) return
    const [podId, epId] = episodeId.split(' ')
    const episode = store
      .getState()
      .podcasts.byId[podId].episodes.find(({ id }) => id === `${podId} ${epId}`)
    if (!episode || !episode.file) return
    return episode
  }
}
