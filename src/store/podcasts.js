const types = {
  ADD_PODCAST_ID: 'ADD_PODCAST_ID',
  SET_TITLE: 'SET_TITLE',
  SET_CREATOR: 'SET_CREATOR',
}

import { assert } from '~/scripts/debug'

export default {
  namespaced: true,
  state: {
    podcasts: {},
  },
  mutations: {
    [types.ADD_PODCAST_ID]: (state, id) => {
      if (!state.podcasts[id]) state.podcasts[id] = {}
    },
    [types.SET_TITLE]: (state, { id, title }) => {
      state.podcasts[id].title = title
    },
    [types.SET_CREATOR]: (state, { id, creator }) => {
      state.podcasts[id].creator = creator
    },
  },
  actions: {
    addPodcast: async ({ state, commit }, { id, title, creator }) => {
      assert(() => id !== undefined, 'podcast id required')
      if (!state[id]) commit(types.ADD_PODCAST_ID, id)
      if (title) commit(types.SET_TITLE, { id, title })
      if (creator) commit(types.SET_CREATOR, { id, creator })
    },
  },
}
