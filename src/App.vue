<template>
  <div :class="getClass">
    <RouterView class="content"></RouterView>
    <ControlBar></ControlBar>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import ControlBar from '~/components/molecular/ControlBar'

export default new Component({
  name: 'App',
  components: {
    ControlBar,
  },
})
</script>
