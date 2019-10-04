import { System } from '.'
import { MutableRefObject } from 'react'
import store from '~/store'
import {
  setPlayerState,
  setCurrentEpisode,
  setPlayerLength,
  setPlayerProgress,
  setPlayerBuffered,
  setPlayerFetching,
} from '~/store/actions'
import { Episode } from '~/store/state'

export default class Audio implements System {
  public readonly name = 'audio'
  private audioContext: AudioContext
  private audioRef: MutableRefObject<HTMLAudioElement>
  private track: MediaElementAudioSourceNode
  private gainNode: GainNode
  private episode: Episode

  // private playing = false
  private playbackTime: number
  private lastTimeUpdate: number
  private isNew = false
  private requestState: 'play' | 'pause'

  private buffers = []

  constructor(audioRef: MutableRefObject<HTMLAudioElement>) {
    this.audioRef = audioRef
    this.updateProgress = this.updateProgress.bind(this)
    this.updatePlayerBuffered = this.updatePlayerBuffered.bind(this)
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
    this.gainNode.gain.value = 0.1

    this.audioRef.current.addEventListener('play', () => {
      if (this.audioRef.current.readyState === 4) return
      store.dispatch(setPlayerFetching(true))
      store.dispatch(setPlayerState('waiting'))
      store.dispatch(setPlayerFetching(true))
      // this.playing = false
      this.stopUpdateProgress()
    })

    this.audioRef.current.addEventListener('playing', () => {
      // store.
      // const request = this.requestState
      // this.requestState = null
      // if (request === 'pause') {
      //   return this.audioRef.current.pause()
      // }

      // this.playing = true
      if (this.isNew) {
        this.isNew = false
        this.playbackTime = 0
      }
      this.lastTimeUpdate = this.audioContext.currentTime

      store.dispatch(setPlayerFetching(false))
      store.dispatch(setPlayerState('playing'))
      store.dispatch(setPlayerLength(this.episode.duration))
      this.startUpdateProgress()
    })

    this.audioRef.current.addEventListener('pause', () => {
      if (store.getState().player.state === 'playing')
        store.dispatch(setPlayerState('paused'))
      // this.playing = false
      this.playbackTime += this.audioContext.currentTime - this.lastTimeUpdate

      this.stopUpdateProgress()
    })

    this.audioRef.current.addEventListener(
      'progress',
      this.updatePlayerBuffered
    )

    this.audioRef.current.addEventListener('seeking', () =>
      store.dispatch(setPlayerFetching(true))
    )
    this.audioRef.current.addEventListener('seeked', () =>
      store.dispatch(setPlayerFetching(false))
    )
    // this.audioRef.current.addEventListener('loadstart', () => {
    //   if (this.audioRef.current.networkState < 3)
    //     store.dispatch(setPlayerFetching(true))
    // })

    // this.audioRef.current.addEventListener('seeking', () => {
    //   if (!this.requestState)
    //     this.requestState = this.playing ? 'play' : 'pause'
    // })

    // this.audioRef.current.addEventListener('seeked', () => {
    //   if (!this.requestState || this.audioRef.current.readyState < 3) return
    //   console.log('request', this.requestState)
    //   this[this.requestState]()
    //   this.requestState = null
    // })
  }

  private async play(episodeId: string) {
    if (!episodeId) return
    const [podId, epId] = episodeId.split(' ')
    const episode = store
      .getState()
      .podcasts.byId[podId].episodes.find(({ id }) => id === `${podId} ${epId}`)
    if (!episode || !episode.file) return
    this.isNew = true
    this.episode = episode

    store.dispatch(setCurrentEpisode(episodeId))
    store.dispatch(setPlayerLength(null))
    store.dispatch(setPlayerProgress(null))

    if (!this.audioContext) this.init()
    this.audioRef.current.src =
      'http://ec2-54-210-249-115.compute-1.amazonaws.com/' + episode.file

    this.audioRef.current.load()

    if (this.audioContext.state === 'suspended')
      await this.audioContext.resume()

    await this.audioRef.current.play()
  }

  private pause() {
    if (!this.audioRef.current) return
    if (this.audioRef.current.readyState >= 3) this.audioRef.current.pause()
    else this.requestState = 'pause'
  }

  private resume() {
    if (!this.audioRef.current) return
    if (this.audioRef.current.readyState >= 3) this.audioRef.current.play()
    else this.requestState = 'play'
  }

  private setVolume(v: number) {
    if (!this.gainNode) return
    this.gainNode.gain.value = v
  }

  private attached = false
  private jump(direction: 'forward' | 'backward') {
    if (!this.audioRef.current) return

    let dt = direction === 'forward' ? 30 : -10
    if (this.getProgress() + dt < 0) dt = -this.getProgress()
    this.audioRef.current.currentTime += dt
    this.playbackTime = this.getProgress() + dt
    this.lastTimeUpdate = this.audioContext.currentTime
    this.updateProgress()

    if (this.audioRef.current.readyState <= 2) {
      store.dispatch(setPlayerState('waiting'))
      // store.dispatch(setPlayerFetching(true))
      // this.playing = false
      this.audioRef.current.pause()

      if (!this.attached) {
        const onCanPlay = () => {
          this.attached = false
          this.audioRef.current.play()
          this.audioRef.current.removeEventListener('canplay', onCanPlay)
        }
        this.audioRef.current.addEventListener('canplay', onCanPlay)
      }
    }
  }

  updateInterval: number
  private updateProgress() {
    if (!this.audioRef.current) return
    store.dispatch(setPlayerProgress(this.getProgress()))
  }
  private getProgress() {
    return store.getState().player.state === 'playing'
      ? this.playbackTime +
          (this.audioContext.currentTime - this.lastTimeUpdate)
      : this.playbackTime
  }
  private startUpdateProgress() {
    if (this.updateInterval) this.stopUpdateProgress()
    if (!this.episode.duration) return
    this.updateProgress()
    this.updateInterval = setInterval(this.updateProgress, 1000)
  }
  private stopUpdateProgress() {
    if (!this.updateInterval) return
    this.updateProgress()
    clearInterval(this.updateInterval)
    this.updateInterval = null
  }

  private updatePlayerBuffered() {
    const buffered = this.audioRef.current.buffered
    store.dispatch(
      setPlayerBuffered(
        Math.max(
          0,
          ...new Array(buffered.length).fill(0).map((_, i) => buffered.end(i))
        )
      )
    )
  }
}
