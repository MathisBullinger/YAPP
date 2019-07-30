<template>
  <div :class="getClass">
    <audio crossorigin="anonymous" src="https://traffic.libsyn.com/hellointernet/126.mp3"></audio>
    <div class="controls">
      <PlayButton v-model="playState"></PlayButton>
    </div>
  </div>
</template>

<script>
import Component from '~scripts/component'
import PlayButton from './player/PlayButton'

export default new Component({
  name: 'Player',
  components: {
    PlayButton,
  },
  data() {
    return {
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      playState: false,
      track: null,
      audioElement: null,
    }
  },
  watch: {
    playState(v) {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume()
      }
      if (v) this.audioElement.play()
      else this.audioElement.pause()
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

  .controls {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
