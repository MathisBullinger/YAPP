import { store } from '~/store'
import { Howl } from 'howler'
import action from '~/store/actions'

let episode: { ctrl: Howl; info: Episode }

function getEpisodeInfo(episodeId: string) {
  const episodeInfo = (store.getState() as State).podcasts.byId[
    episodeId.split(' ').shift()
  ]?.episodes?.find(({ id }) => id === episodeId)
  if (!episodeInfo) throw Error(`can't find episode ${episodeId}`)
  return episodeInfo
}

let watchingProg: number
function watchProgress() {
  const prog = episode?.ctrl?.seek()
  if (typeof prog !== 'number') return
  store.dispatch(action('SET_PLAYER_PROGRESS', prog))
  if (episode?.ctrl?.playing())
    watchingProg = setTimeout(watchProgress, 1000 - ((prog * 1000) % 1000) + 20)
  else watchingProg = null
}

function play(id: string) {
  if (episode) episode.ctrl.unload()
  const info = getEpisodeInfo(id)
  episode = {
    ctrl: new Howl({ src: [info.file], html5: true }),
    info,
  }
  store.dispatch(action('SET_CURRENT_EPISODE', id))
  store.dispatch(action('SET_PLAYER_STATE', 'waiting'))
  episode.ctrl.play()

  episode.ctrl.on('load', () => {
    store.dispatch(action('SET_PLAYER_LENGTH', episode.ctrl.duration()))
  })

  episode.ctrl.on('play', () => {
    const progress = episode.ctrl.seek()
    store.dispatch(action('SET_PLAYER_STATE', 'playing'))
    if (typeof progress !== 'number') return
    if (watchingProg) clearTimeout(watchingProg)
    watchProgress()
    store.dispatch(action('SET_LAST_SEEK', performance.now()))
  })

  episode.ctrl.on('pause', () => {
    store.dispatch(action('SET_PLAYER_STATE', 'paused'))
  })

  episode.ctrl.on('seek', () => {
    if (!watchingProg) watchProgress()
    store.dispatch(action('SET_LAST_SEEK', performance.now()))
  })
}

function setProgress(sec: number, { relative = false } = {}) {
  let prog = episode?.ctrl?.seek()
  if (typeof prog !== 'number') prog = 0
  const newPos = relative ? prog + sec : sec
  store.dispatch(action('SET_PLAYER_PROGRESS', newPos))
  episode?.ctrl?.seek(newPos)
}

function setVolume(vol: number) {
  episode?.ctrl.volume(Math.max(Math.min(vol, 1), 0))
}

function togglePlay() {
  episode?.ctrl?.playing() ? episode?.ctrl?.pause() : episode?.ctrl?.play()
}

const toggle = (id: string) =>
  episode?.info?.id === id ? togglePlay : () => play(id)

export default { play, togglePlay, toggle, setProgress, setVolume }
