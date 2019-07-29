<template>
  <div :class="getClass">
    <audio controls src="http://traffic.libsyn.com/hellointernet/126.mp3">
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  </div>
</template>

<script>
import Component from '~scripts/component'

export default new Component({
  name: 'Player',
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
}
</style>
