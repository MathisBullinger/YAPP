const types = {
  SET_SHOW_APPBAR: 'SET_SHOW_APPBAR',
  SET_HIDE_APPBAR_ON_SCROLL: 'SET_HIDEBAR_ON_SCROLL',
  SET_MERGE_APPBAR_AT_TOP: 'SET_MERGE_APPBAR_AT_TOP',
  SET_PAGE_TITLE: 'SET_PAGE_TITLE',
  SET_PAGE_LOADING: 'SET_PAGE_LOADING',
  SET_NAVIGATION: 'SET_NAVIGATION',
  SET_CUSTOM_APPBAR: 'SET_CUSTOM_APPBAR',
}

export default {
  namespaced: true,
  state: {
    showAppBar: false,
    hideAppBarOnScroll: false,
    mergeAppBarAtTop: false,
    navigation: null,
    pageTitle: '',
    pageLoading: false,
    customAppBar: null,
  },
  mutations: {
    [types.SET_PAGE_TITLE]: (state, title) => {
      state.pageTitle = title
    },
    [types.SET_SHOW_APPBAR]: (state, v) => {
      state.showAppBar = v
    },
    [types.SET_HIDE_APPBAR_ON_SCROLL]: (state, v) => {
      state.hideAppBarOnScroll = v
    },
    [types.SET_MERGE_APPBAR_AT_TOP]: (state, v) => {
      state.mergeAppBarAtTop = v
    },
    [types.SET_PAGE_LOADING]: (state, loading) => {
      state.pageLoading = loading
    },
    [types.SET_NAVIGATION]: (state, v) => {
      state.navigation = v
    },
    [types.SET_CUSTOM_APPBAR]: (state, v) => {
      state.customAppBar = v
    },
  },
  actions: {
    showAppBar: ({ commit }) => {
      commit(types.SET_SHOW_APPBAR, true)
    },
    hideAppBar: ({ commit }) => {
      commit(types.SET_SHOW_APPBAR, false)
    },
    hideAppBarOnScroll: ({ commit }, v = true) => {
      commit(types.SET_HIDE_APPBAR_ON_SCROLL, v)
    },
    mergeAppBarAtTop: ({ commit }, v = true) => {
      commit(types.SET_MERGE_APPBAR_AT_TOP, v)
    },
    setPage: ({ commit }, title) => {
      commit(types.SET_PAGE_TITLE, title)
    },
    setPageLoading: ({ state, commit }, loading) => {
      if (state.pageLoading !== loading) commit(types.SET_PAGE_LOADING, loading)
    },
    setNavigation: ({ commit }, v = null) => {
      commit(types.SET_NAVIGATION, v)
    },
    setCustomAppBar: ({ commit }, v = null) => {
      commit(types.SET_CUSTOM_APPBAR, v)
    },
  },
}
