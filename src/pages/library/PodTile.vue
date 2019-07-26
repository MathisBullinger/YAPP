<template>
  <div :class="getClass" :style="tileStyle"></div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'PodTile',
  computed: {
    tileStyle: () => ({
      'background-color': `rgb(${Array.from(
        { length: 3 },
        () => Math.random() * 255
      ).join()})`,
    }),
  },
})
</script>

<style lang="scss" scoped>
.pod-tile {
  padding-bottom: 100%;
}
</style>
