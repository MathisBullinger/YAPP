import { System } from '.'
import StateManager from './audio/StateManager'
import store from '~/store'
import { setCurrentEpisode } from '~/store/actions'

export default class Audio implements System {
  public readonly name = 'audio'
  private static readonly publicActions = [
    'connect',
    'disconnect',
    'play',
    'pause',
    'resume',
    'jump',
  ]
  private static readonly proxy =
    'http://ec2-54-210-249-115.compute-1.amazonaws.com/'

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

    this.audioEl.src = Audio.proxy + episode.file
    await this.audioEl.play()
  }

  public pause() {
    this.audioEl.pause()
  }

  public resume() {
    this.audioEl.play()
  }

  public jump(direction: 'forward' | 'backward') {
    let dt = direction === 'forward' ? 30 : -10
    this.audioEl.currentTime += dt
    this.state.jump(dt * 1000)
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
