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
    [types.SET_PODCAST]: (state, { id, name, creator, artworks }) => {
      if (!state.podcastList.includes(id)) {
        state.podcastList.push(id)
        state.podcasts[id] = {}
      }

      Object.assign(state.podcasts[id], {
        ...(name && { name }),
        ...(creator && { creator }),
        ...(artworks && { artworks }),
      })
    },
  },
  actions: {
    loadPodcast: async ({ state, commit }, itunesId) => {
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
