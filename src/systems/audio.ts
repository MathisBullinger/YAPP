import { System } from '.'
import { MutableRefObject } from 'react'
import store from '~/store'
import {
  togglePlaying,
  setCurrentEpisode,
  setPlayerLength,
  setPlayerProgress,
} from '~/store/actions'
import { Episode } from '~/store/state'

export default class Audio implements System {
  public readonly name = 'audio'
  private audioContext: AudioContext
  private audioRef: MutableRefObject<HTMLAudioElement>
  private track: MediaElementAudioSourceNode
  private gainNode: GainNode
  private episode: Episode

  constructor(audioRef: MutableRefObject<HTMLAudioElement>) {
    this.audioRef = audioRef
    this.updateProgress = this.updateProgress.bind(this)
  }

  public msg(action: string, ...payload: any) {
    if (action in this) this[action](...payload)
  }

  private init() {
    this.audioContext = new (window.AudioContext ||
      (<any>window).webkitAudioContext)()
    this.track = this.audioContext.createMediaElementSource(
      this.audioRef.current
    )
    this.gainNode = this.audioContext.createGain()
    this.track.connect(this.gainNode).connect(this.audioContext.destination)
  }

  private play(episodeId: string) {
    if (!episodeId) return
    const [podId, epId] = episodeId.split(' ')
    const episode = store
      .getState()
      .podcasts.byId[podId].episodes.find(({ id }) => id === `${podId} ${epId}`)
    if (!episode || !episode.file) return
    this.episode = episode

    store.dispatch(setCurrentEpisode(episodeId))

    if (!this.audioContext) this.init()
    this.audioRef.current.src =
      'http://ec2-54-210-249-115.compute-1.amazonaws.com/' + episode.file

    if (this.audioContext.state === 'suspended') this.audioContext.resume()
    this.audioRef.current.play()

    store.dispatch(setPlayerLength(episode.duration))
    store.dispatch(togglePlaying(true))
    this.startUpdateProgress()
  }

  private pause() {
    if (!this.audioRef.current) return
    this.audioRef.current.pause()
    store.dispatch(togglePlaying(false))
    this.stopUpdateProgress()
  }

  private resume() {
    if (!this.audioRef.current) return
    this.audioRef.current.play()
    store.dispatch(togglePlaying(true))
    this.startUpdateProgress()
  }

  private setVolume(v: number) {
    if (!this.gainNode) return
    this.gainNode.gain.value = v
  }

  private jump(direction: 'forward' | 'backward') {
    if (!this.audioRef.current) return
    const newPos =
      this.audioRef.current.currentTime + (direction === 'forward' ? 30 : -10)
    this.audioRef.current.currentTime = newPos
  }

  updateInterval: number
  private updateProgress() {
    if (!this.audioRef.current) return
    store.dispatch(setPlayerProgress(this.audioRef.current.currentTime))
  }
  private startUpdateProgress() {
    if (this.updateInterval) this.stopUpdateProgress()
    if (!this.episode.duration) return
    this.updateInterval = setInterval(this.updateProgress, 5000)
  }
  private stopUpdateProgress() {
    clearInterval(this.updateInterval)
    this.updateInterval = null
  }
}
