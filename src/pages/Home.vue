<template>
  <div :class="getClass">
    <ControlBar></ControlBar>
  </div>
</template>

<script>
import Component from '/util/component'
import ControlBar from '/components/ControlBar'

export default new Component({
  name: 'Home',
  components: {
    ControlBar,
  },
})
</script>

<style lang="scss" scoped></style>
