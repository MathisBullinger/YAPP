<template>
  <div :class="getClass">
    <RouterView class="content"></RouterView>
    <ControlBar></ControlBar>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import ControlBar from '~/components/molecular/ControlBar'
import { mapActions } from 'vuex'

export default new Component({
  name: 'App',
  components: {
    ControlBar,
  },
  methods: mapActions('user', ['initGoogleAuth']),
  created() {
    if (window.gapi) {
      this.initGoogleAuth()
    } else {
      window.initGoogleAuth = function() {
        this.initGoogleAuth()
        delete window.initGoogleAuth
      }.bind(this)
    }
  },
})
</script>

<style lang="scss" scoped>
.app {
  height: calc(100vh - 4rem);
  overflow-y: scroll;
}
</style>
