import api from '~/api'
import gql from 'graphql-tag'

const types = {
  SET_PODCAST: 'SET_PODCAST',
}

import { assert } from '~/scripts/debug'

export default {
  namespaced: true,
  state: {
    podcasts: {},
    podcastList: [],
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
    },
  },
  actions: {
    loadPodcast: async ({ commit }, itunesId) => {
      assert(() => itunesId)

      const {
        data: { podcast },
      } = await api.query({
        query: gql`
          query loadPodcast($itunesId: ID!) {
            podcast(itunesId: $itunesId) {
              name
              creator
              artworks {
                url
                size
              }
              episodes {
                title
              }
            }
          }
        `,
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
