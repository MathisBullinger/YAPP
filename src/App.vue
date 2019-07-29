<template>
  <div :class="getClass">
    <AppBar :scroll-dir="scrollDir"></AppBar>
    <RouterView class="content" @scrollDirChange="onScrollDirChange" @showEpisode="showEpisode"></RouterView>
    <Player></Player>
    <MainNav></MainNav>
    <Episode v-if="episode" :id="episode" @closed="closeEpisode"></Episode>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import AppBar from '~/components/molecular/AppBar'
import Player from '~/components/molecular/Player'
import MainNav from '~/components/molecular/MainNav'
import Episode from '~/pages/Episode'
import { mapActions } from 'vuex'

export default new Component({
  name: 'App',
  components: {
    AppBar,
    Player,
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
    closeEpisode() {
      this.episode = false
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
  .content {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding-top: 3.5rem;
  }
}
</style>
