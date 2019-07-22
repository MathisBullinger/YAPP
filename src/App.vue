<template>
  <div :class="getClass">
    <main>
      <RouterView class="content"></RouterView>
    </main>
    <div class="bottom">
      <!-- <ControlBar></ControlBar> -->
      <MainNav></MainNav>
    </div>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import ControlBar from '~/components/molecular/ControlBar'
import MainNav from '~/components/molecular/MainNav'
import { mapActions } from 'vuex'

export default new Component({
  name: 'App',
  components: {
    ControlBar,
    MainNav,
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
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;

  main {
    overflow-y: scroll;
  }

  .bottom {
    display: block;
    bottom: 0;
  }
}
</style>
