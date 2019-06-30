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
    id: '',
    name: '',
    givenName: '',
    email: '',
    picture: '',
    gAuthClientId:
      '75138250727-l5c04n890osefg8gcp3bvcq04uv6lafp.apps.googleusercontent.com',
  },
  mutations: {
    [types.SET_ID]: (state, id) => (state.id = id),
    [types.SET_NAME]: (state, name) => (state.name = name),
    [types.SET_GIVEN_NAME]: (state, givenName) => (state.givenName = givenName),
    [types.SET_EMAIL]: (state, email) => (state.email = email),
    [types.SET_PICTURE]: (state, picture) => (state.picture = picture),
  },
  actions: {
    initGoogleAuth: async ({ state, dispatch }) => {
      await new Promise(r => gapi.load('auth2', r))
      const auth2 = gapi.auth2.init({ client_id: state.gAuthClientId })
      auth2.currentUser.listen(user => dispatch('setUser', user))
    },
    setUser: ({ commit }, user) => {
      if (!user.isSignedIn()) return
      user = user.getBasicProfile()
      commit(types.SET_ID, user.getId())
      commit(types.SET_NAME, user.getName())
      commit(types.SET_GIVEN_NAME, user.getGivenName())
      commit(types.SET_EMAIL, user.getEmail())
      commit(types.SET_PICTURE, user.getImageUrl())
    },
  },
}
