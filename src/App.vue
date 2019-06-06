<template>
  <div :class="getClass">
    <RouterView class="content"></RouterView>
    <ControlBar></ControlBar>
  </div>
</template>

<script>
import Component from '/utils/component'
import ControlBar from '/components/molecular/ControlBar'

export default new Component({
  name: 'App',
  components: {
    ControlBar,
  },
})
</script>

<style lang="scss" scoped>
.app {
  .content {
    margin-left: 2rem;
  }
}
</style>
