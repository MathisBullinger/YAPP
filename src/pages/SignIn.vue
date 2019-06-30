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
  name: 'SignIn',
  methods: mapActions('user', ['setUser']),
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
