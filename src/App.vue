<template>
  <div :class="getClass">
    <AppBar :scroll-dir="scrollDir"></AppBar>
    <Player :fixed="keyboardOpen"></Player>
    <MainNav :fixed="keyboardOpen"></MainNav>
    <RouterView class="content" @showEpisode="showEpisode" @keyboard="onKeyboard"></RouterView>
    <Episode v-if="episode" :id="episode" @closed="closeEpisode"></Episode>
  </div>
</template>

<script>
import { debounce, throttle } from 'lodash'
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
      lastScrollPos: 0,
      lastScrollDelta: 0,
      keyboardOpen: false,
    }
  },
  methods: {
    ...mapActions('user', ['initGoogleAuth']),
    onScrollDirChange(dir) {
      this.scrollDir = dir
    },
    showEpisode(id) {
      this.episode = id
      document.body.classList.add('noscroll')
    },
    closeEpisode() {
      this.episode = false
      document.body.classList.remove('noscroll')
    },
    onScroll: throttle(function() {
      const scrollDelta = window.scrollY - this.lastScrollPos
      if (
        scrollDelta > 0 !== this.lastScrollDelta > 0 &&
        window.scrollY > 0 && // not topmost
        document.body.scrollHeight - window.scrollY > document.body.offsetHeight // not bottommost
      )
        this.onScrollDirChange(scrollDelta)
      this.lastScrollDelta = window.scrollY - this.lastScrollPos
      this.lastScrollPos = window.scrollY

      if (window.scrollY === 0) this.lastScrollDelta = -1
      else if (
        document.body.scrollHeight - window.scrollY <=
        document.body.offsetHeight
      )
        this.lastScrollDelta = 1
    }, 50),
    onKeyboard(v) {
      if (v) this.keyboardOpen = v
      else setTimeout(() => (this.keyboardOpen = v), 200)
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
    this.lastScrollPos = window.scrollY
    window.addEventListener('scroll', debounce(this.onScroll), {
      passive: true,
    })
  },
})
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  overflow: auto;

  .content {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;

    @media (orientation: portrait) {
      margin-bottom: 4rem;
      margin-top: 3.5rem;
    }

    @media (orientation: landscape) {
      margin-left: 5rem;
      width: calc(100vw - 5rem);
    }
  }

  .player ~ .content {
    margin-bottom: 8rem;
    @media (orientation: landscape) {
      margin-bottom: 4rem;
    }
  }
}
</style>
