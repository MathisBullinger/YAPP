import { System } from '.'
import { MutableRefObject } from 'react'
import store from '~/store'
import { togglePlaying, setCurrentEpisode } from '~/store/actions'

export default class Audio implements System {
  public readonly name = 'audio'
  private audioContext: AudioContext
  private audioRef: MutableRefObject<HTMLAudioElement>
  private track: MediaElementAudioSourceNode
  private gainNode: GainNode

  constructor(audioRef: MutableRefObject<HTMLAudioElement>) {
    this.audioRef = audioRef
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

    store.dispatch(setCurrentEpisode(episodeId))

    if (!this.audioContext) this.init()
    this.audioRef.current.src = episode.file

    if (this.audioContext.state === 'suspended') this.audioContext.resume()
    this.audioRef.current.play()

    store.dispatch(togglePlaying(true))
  }

  private pause() {
    if (!this.audioRef.current) return
    this.audioRef.current.pause()
    store.dispatch(togglePlaying(false))
  }

  private resume() {
    if (!this.audioRef.current) return
    this.audioRef.current.play()
    store.dispatch(togglePlaying(true))
  }

  private setVolume(v: number) {
    if (!this.gainNode) return
    this.gainNode.gain.value = v
  }
}
