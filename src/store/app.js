const types = {
  TOGGLE_APP_BAR: 'TOGGLE_APP_BAR',
  SET_PAGE_TITLE: 'SET_PAGE_TITLE',
}

export default {
  namespaced: true,
  state: {
    showAppBar: false,
    pageTitle: '',
  },
  mutations: {
    [types.SET_PAGE_TITLE]: (state, title) => {
      state.pageTitle = title
    },
    [types.TOGGLE_APP_BAR]: state => {
      state.showAppBar = !state.showAppBar
    },
  },
  actions: {
    showAppBar: ({ state, commit }) => {
      if (!state.showAppBar) commit(types.TOGGLE_APP_BAR)
    },
    hideAppBar: {
      root: true,
      handler({ state, commit }) {
        if (state.showAppBar) commit(types.TOGGLE_APP_BAR)
      },
    },
    setPage: ({ commit }, title) => {
      commit(types.SET_PAGE_TITLE, title)
    },
  },
}
