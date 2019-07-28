import api from '~/api'
import loadPodcastQuery from '~/gql/loadPodcast'

const types = {
  SET_PODCAST: 'SET_PODCAST',
}

import { assert } from '~/scripts/debug'

export default {
  namespaced: true,
  state: {
    podcasts: {},
    podcastList: [],
    episodes: {},
  },
  getters: {
    podcast: state => id => state.podcasts[id],
  },
  mutations: {
    [types.SET_PODCAST]: (state, payload) => {
      if (!state.podcastList.includes(payload.id)) {
        state.podcastList.push(payload.id)
        state.podcasts[payload.id] = {}
      }
      Object.assign(state.podcasts[payload.id], payload)
      if ('episodes' in payload) {
        payload.episodes.forEach(episode => {
          state.episodes[episode.id] = state.podcasts[payload.id].episodes.find(
            e => e.id === episode.id
          )
          state.episodes[episode.id].podcastId = payload.id
        })
      }
    },
  },
  actions: {
    loadPodcast: async ({ commit }, itunesId) => {
      assert(() => itunesId)

      const {
        data: { podcast },
      } = await api.query({
        query: loadPodcastQuery,
        variables: {
          itunesId,
        },
      })

      if (!podcast) return

      commit(types.SET_PODCAST, { id: itunesId, ...podcast })
    },

    setPodcast: ({ commit }, payload) => commit(types.SET_PODCAST, payload),
  },
}
