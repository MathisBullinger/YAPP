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
  height: 4rem;
  width: 100%;
  overflow: hidden;
}
</style>
