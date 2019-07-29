<template>
  <div :class="getClass">
    <audio src="http://traffic.libsyn.com/hellointernet/126.mp3"></audio>
    <div class="controls">
      <!-- <Icon :name="playState ? 'pause' : 'play'" @click="togglePlay"></Icon> -->
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
    }
  },
  watch: {
    playState(v) {
      console.log(v)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';

.player {
  width: 100%;
  height: 4rem;
  background-color: white;
  grid-area: bottom;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(#000, 8%);
  @include pseudoShadow(7);

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
