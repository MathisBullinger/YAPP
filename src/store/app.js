const types = {
  TOGGLE_APP_BAR: 'TOGGLE_APP_BAR',
  SET_PAGE_TITLE: 'SET_PAGE_TITLE',
  SET_PAGE_LOADING: 'SET_PAGE_LOADING',
}

export default {
  namespaced: true,
  state: {
    showAppBar: false,
    pageTitle: '',
    pageLoading: false,
  },
  mutations: {
    [types.SET_PAGE_TITLE]: (state, title) => {
      state.pageTitle = title
    },
    [types.TOGGLE_APP_BAR]: state => {
      state.showAppBar = !state.showAppBar
    },
    [types.SET_PAGE_LOADING]: (state, loading) => {
      state.pageLoading = loading
    },
  },
  actions: {
    showAppBar: ({ state, commit }) => {
      if (!state.showAppBar) commit(types.TOGGLE_APP_BAR)
    },
    hideAppBar: ({ state, commit }) => {
      if (state.showAppBar) commit(types.TOGGLE_APP_BAR)
    },
    setPage: ({ commit }, title) => {
      commit(types.SET_PAGE_TITLE, title)
    },
    setPageLoading: ({ state, commit }, loading) => {
      if (state.pageLoading !== loading) commit(types.SET_PAGE_LOADING, loading)
    },
  },
}
