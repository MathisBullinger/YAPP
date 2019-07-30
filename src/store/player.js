const types = {
  SET_PLAYING: 'SET_PLAYING',
  SET_REQUEST: 'SET_REQUEST',
}

export default {
  namespaced: true,
  state: {
    playing: null,
    request: null,
  },
  mutations: {
    [types.SET_PLAYING]: (state, payload) => {
      state.playing = payload
    },
    [types.SET_REQUEST]: (state, payload) => {
      state.request = payload
    },
  },
  actions: {
    play: ({ commit }, episodeId) => {
      commit(types.SET_PLAYING, episodeId)
    },
    request: ({ commit }, episodeId) => {
      commit(types.SET_REQUEST, episodeId)
    },
  },
}
