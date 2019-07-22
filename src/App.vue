<template>
  <div :class="getClass">
    <RouterView class="content"></RouterView>
    <ControlBar></ControlBar>
    <MainNav></MainNav>
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
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'main main'
    'bottom bottom';

  .content {
    grid-area: main;
    overflow-y: scroll;
  }

  .control-bar {
    grid-area: bottom;
  }

  .main-nav {
    grid-column: 1 / -1;
  }

  @media screen and (min-width: 500px) {
    grid-template-areas:
      'left right'
      'bottom bottom';

    .main-nav {
      grid-area: left;
    }

    .content {
      grid-area: right;
    }
  }
}
</style>
