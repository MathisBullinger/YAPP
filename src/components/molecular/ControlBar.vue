<template>
  <div :class="getClass">
    <Button>play</Button>
  </div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'ControlBar',
})
</script>

<style lang="scss" scoped>
.control-bar {
  background-color: black;

  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 4rem;
}
</style>
