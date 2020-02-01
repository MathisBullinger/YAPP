import { store } from '~/store'
import { Howl } from 'howler'
import action from '~/store/actions'

let episode: { ctrl: Howl; info: Episode }

function getEpisodeInfo(episodeId: string) {
  const podcast = (store.getState() as State).podcasts.byId[
    episodeId.split(' ')[0]
  ]
  const episodeInfo = podcast?.episodes?.find(({ id }) => id === episodeId)
  if (!episodeInfo) throw Error(`can't find episode ${episodeId}`)
  return { ...episodeInfo, podcast }
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

function setupMediaSession(id: string) {
  if (!('mediaSession' in navigator)) return
  let info = getEpisodeInfo(id)

  const formatArtworks = (artworks: any[]) =>
    artworks.map(({ size, type, url }) => ({
      src: url,
      sizes: `${size}x${size}`,
      type: `image/${type}`,
    }))

  if (!info.artworks?.length) {
    store.dispatch(action('FETCH_EPISODE', id))
    const unsubscribe = store.subscribe(() => {
      info = getEpisodeInfo(id)
      if (!info._fetched) return
      if (info.artworks?.length)
        navigator.mediaSession.metadata.artwork = formatArtworks(info.artworks)
      unsubscribe()
    })
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: info.title,
    artist: info.podcast.creator,
    album: info.podcast.name,
    artwork: formatArtworks([
      ...(info.artworks ?? []),
      ...info.podcast.artworks,
    ]),
  })

  navigator.mediaSession.setActionHandler('play', () => {
    episode.ctrl.play()
  })
  navigator.mediaSession.setActionHandler('pause', () => {
    episode.ctrl.pause()
  })
  navigator.mediaSession.setActionHandler('seekbackward', () => {
    setProgress(-10, { relative: true })
  })
  navigator.mediaSession.setActionHandler('seekforward', () => {
    setProgress(30, {
      relative: true,
    })
  })
  navigator.mediaSession.setActionHandler('previoustrack', () => {})
  navigator.mediaSession.setActionHandler('nexttrack', () => {})
}

function play(id: string) {
  if (episode) episode.ctrl.unload()
  store.dispatch(action('SET_PLAYER_FETCHING', true))
  const info = getEpisodeInfo(id)
  episode = {
    ctrl: new Howl({
      src: [`https://proxy.bullinger.dev/${info.file}`],
      html5: true,
    }),
    info,
  }
  setVolume()
  store.dispatch(action('SET_CURRENT_EPISODE', id))
  store.dispatch(action('SET_PLAYER_STATE', 'waiting'))
  episode.ctrl.play()
  ;(window as any).Howler?._howls[0]?._sounds[0]?._node?.addEventListener(
    'seeking',
    () => {
      store.dispatch(action('SET_PLAYER_FETCHING', true))
    }
  )
  ;(window as any).Howler?._howls[0]?._sounds[0]?._node?.addEventListener(
    'playing',
    () => {
      store.dispatch(action('SET_PLAYER_FETCHING', false))
    }
  )

  setupMediaSession(id)

  episode.ctrl.on('load', () => {
    store.dispatch(action('SET_PLAYER_LENGTH', episode.ctrl.duration()))
  })

  episode.ctrl.on('play', () => {
    const progress = episode.ctrl.seek()
    store.dispatch(action('SET_PLAYER_STATE', 'playing'))
    store.dispatch(action('SET_LAST_SEEK', performance.now()))
    navigator.mediaSession.playbackState = 'playing'
    if (typeof progress !== 'number') return
    if (watchingProg) clearTimeout(watchingProg)
    watchProgress()
  })

  episode.ctrl.on('pause', () => {
    store.dispatch(action('SET_PLAYER_STATE', 'paused'))
    navigator.mediaSession.playbackState = 'paused'
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

function setVolume(vol: number = store.getState().player.volume) {
  store.dispatch(action('SET_PLAYER_VOLUME', vol))
  episode?.ctrl.volume(Math.max(Math.min(vol, 1), 0))
}

function togglePlay() {
  episode?.ctrl?.playing() ? episode?.ctrl?.pause() : episode?.ctrl?.play()
}

const toggle = (id: string) =>
  episode?.info?.id === id ? togglePlay : () => play(id)

export default { play, togglePlay, toggle, setProgress, setVolume }
