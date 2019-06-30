<template>
  <div :class="getClass">
    <div ref="signin-wrap" class="bt-wrap">
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapActions } from 'vuex'

export default new Component({
  name: 'Login',
  methods: mapActions('user', ['setUser']),
  mounted() {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id:
          '75138250727-l5c04n890osefg8gcp3bvcq04uv6lafp.apps.googleusercontent.com',
      })
      auth2.attachClickHandler(this.$refs['signin-wrap'], {}, this.setUser)
    })
  },
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;

  .bt-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
