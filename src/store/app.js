const types = {
  TOGGLE_APPBAR: 'TOGGLE_APPBAR',
  SET_HIDE_APPBAR_ON_SCROLL: 'SET_HIDEBAR_ON_SCROLL',
  SET_PAGE_TITLE: 'SET_PAGE_TITLE',
  SET_PAGE_LOADING: 'SET_PAGE_LOADING',
}

export default {
  namespaced: true,
  state: {
    showAppBar: false,
    hideAppBarOnScroll: false,
    pageTitle: '',
    pageLoading: false,
  },
  mutations: {
    [types.SET_PAGE_TITLE]: (state, title) => {
      state.pageTitle = title
    },
    [types.TOGGLE_APPBAR]: state => {
      state.showAppBar = !state.showAppBar
    },
    [types.SET_HIDE_APPBAR_ON_SCROLL]: (state, v) => {
      state.hideAppBarOnScroll = v
    },
    [types.SET_PAGE_LOADING]: (state, loading) => {
      state.pageLoading = loading
    },
  },
  actions: {
    showAppBar: ({ state, commit }) => {
      if (!state.showAppBar) commit(types.TOGGLE_APPBAR)
    },
    hideAppBar: ({ state, commit }) => {
      if (state.showAppBar) commit(types.TOGGLE_APPBAR)
    },
    hideAppBarOnScroll: ({ commit }, v = true) => {
      commit(types.SET_HIDE_APPBAR_ON_SCROLL, v)
    },
    setPage: ({ commit }, title) => {
      commit(types.SET_PAGE_TITLE, title)
    },
    setPageLoading: ({ state, commit }, loading) => {
      if (state.pageLoading !== loading) commit(types.SET_PAGE_LOADING, loading)
    },
  },
}
