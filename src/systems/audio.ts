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

function play(id: string) {
  if (episode) episode.ctrl.unload()
  const info = getEpisodeInfo(id)
  episode = {
    ctrl: new Howl({ src: [info.file], html5: true }),
    info,
  }
  episode.ctrl.play()
  store.dispatch(action('SET_CURRENT_EPISODE', id))
  store.dispatch(action('SET_PLAYER_STATE', 'playing'))
}

function resume() {
  episode.ctrl.play()
  store.dispatch(action('SET_PLAYER_STATE', 'playing'))
}

function pause() {
  episode.ctrl.pause()
  store.dispatch(action('SET_PLAYER_STATE', 'paused'))
}

function togglePlay() {
  episode.ctrl.playing() ? pause() : resume()
}

const toggle = (id: string) =>
  episode?.info?.id === id ? togglePlay : () => play(id)

export default { play, resume, pause, togglePlay, toggle }
