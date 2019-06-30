const types = {
  SET_ID: 'SET_ID',
  SET_NAME: 'SET_NAME',
  SET_GIVEN_NAME: 'SET_GIVEN_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_PICTURE: 'SET_PICTURE',
}

export default {
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    [types.SET_ID]: (state, id) => (state.user.id = id),
    [types.SET_NAME]: (state, name) => (state.user.name = name),
    [types.SET_GIVEN_NAME]: (state, givenName) =>
      (state.user.givenName = givenName),
    [types.SET_EMAIL]: (state, email) => (state.user.email = email),
    [types.SET_PICTURE]: (state, picture) => (state.user.picture = picture),
  },
  actions: {
    setUser: ({ commit }, user) => {
      user = user.getBasicProfile()
      commit(types.SET_ID, user.getId())
      commit(types.SET_NAME, user.getName())
      commit(types.SET_GIVEN_NAME, user.getGivenName())
      commit(types.SET_EMAIL, user.getEmail())
      commit(types.SET_PICTURE, user.getImageUrl())
    },
  },
}
