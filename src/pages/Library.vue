<template>
  <div :class="getClass">
    <PodTile v-for="i in new Array(20)" :key="i"></PodTile>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import PodTile from './library/PodTile'

export default new Component({
  name: 'Library',
  components: {
    PodTile,
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/fluid';

.library {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @include discrete(--columns, 3, 7, 400px, 1200px);
  grid-template-columns: repeat(var(--columns), 1fr);

  @include fluid(grid-gap, 0px, 40px, 400px, 1200px);

  @include fluid(padding-left, 0px, 100px, 400px, 1200px);
  @include fluid(padding-right, 0px, 100px, 400px, 1200px);
  @include fluid(padding-top, 0px, 50px, 400px, 1200px);
}
</style>
