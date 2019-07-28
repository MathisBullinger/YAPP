<template>
  <div :class="getClass">
    <AppBar :scroll-dir="scrollDir"></AppBar>
    <RouterView class="content" @scrollDirChange="onScrollDirChange" @showEpisode="showEpisode"></RouterView>
    <!-- <ControlBar></ControlBar> -->
    <MainNav></MainNav>
    <Episode v-if="episode" :id="episode"></Episode>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import AppBar from '~/components/molecular/AppBar'
import ControlBar from '~/components/molecular/ControlBar'
import MainNav from '~/components/molecular/MainNav'
import Episode from '~/pages/Episode'
import { mapActions } from 'vuex'

export default new Component({
  name: 'App',
  components: {
    AppBar,
    ControlBar,
    MainNav,
    Episode,
  },
  data() {
    return {
      scrollDir: 0,
      episode: false,
    }
  },
  methods: {
    ...mapActions('user', ['initGoogleAuth']),
    onScrollDirChange(dir) {
      this.scrollDir = dir
    },
    showEpisode(id) {
      this.episode = id
    },
  },
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
  mounted() {
    window.addEventListener('resize', ({ target: { innerHeight: height } }) => {
      this.$el.style.height = `${height}px`
    })
    window.dispatchEvent(new Event('resize'))
  },
})
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'top top'
    'main main'
    'bottom bottom';

  .content {
    grid-area: main;
    overflow-y: scroll;
    box-sizing: border-box;
    width: 100%;
  }

  .control-bar {
    grid-area: bottom;
  }

  .main-nav {
    grid-column: 1 / -1;
  }

  @media (orientation: landscape) {
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
