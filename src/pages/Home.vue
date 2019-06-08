<template>
  <div :class="getClass"></div>
</template>

<script>
import Component from '/utils/component'
import ControlBar from '/components/molecular/ControlBar'

export default new Component({
  name: 'Home',
  components: {
    ControlBar,
  },
})
</script>

<style lang="scss" scoped></style>
