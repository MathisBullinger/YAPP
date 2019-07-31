<template>
  <div
    :class="{ ...getClassObj, fixed, hidden: episodeUrl === null }"
    :style="fixPos"
  >
    <audio
      crossorigin="anonymous"
      :src="episodeUrl"
      @play="playState = true"
      @playing="playState = true"
      @pause="playState = false"
    ></audio>
    <div class="controls">
      <PlayButton v-model="playState"></PlayButton>
    </div>
  </div>
</template>

<script>
import Component from '~scripts/component'
import PlayButton from './player/PlayButton'
import { mapState } from 'vuex'

export default new Component({
  name: 'Player',
  components: {
    PlayButton,
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      playState: false,
      track: null,
      audioElement: null,
      episodeUrl: null,
    }
  },
  computed: {
    fixPos() {
      return !this.fixed || !this.$el ? {} : { top: `${this.$el.offsetTop}px` }
    },
    ...mapState('player', ['request']),
    ...mapState('podcasts', ['episodes']),
  },
  watch: {
    async playState(v) {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }
      if (v) {
        if (this.audioElement.src) await this.audioElement.play()
        else this.playState = false
      } else await this.audioElement.pause()
    },
    request(v) {
      this.playEpisode(v)
    },
  },
  methods: {
    async playEpisode(episodeId) {
      if (!this.episodes[episodeId] || !this.episodes[episodeId].file) return
      await this.audioElement.pause()
      this.episodeUrl = this.episodes[episodeId].file
      await this.audioElement.load()
      await this.audioElement.play()
    },
  },
  mounted() {
    this.audioElement = this.$el.querySelector('audio')
    this.track = this.audioContext.createMediaElementSource(this.audioElement)
    this.track.connect(this.audioContext.destination)
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';

.player {
  width: 100%;
  height: 4rem;
  background-color: white;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(#000, 8%);
  box-shadow: shadow(7);

  position: fixed;
  bottom: 4rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  z-index: 1001;

  &.hidden {
    display: none;
  }

  .controls {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;
  }

  &:not(.fixed) {
    @media (orientation: landscape) {
      bottom: 0;
    }
  }
}
</style>
