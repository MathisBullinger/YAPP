<template>
  <div :class="getClass">
    <PodTile v-for="i in new Array(50)" :key="i"></PodTile>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import PodTile from './library/PodTile'
import { mapActions } from 'vuex'

export default new Component({
  name: 'Library',
  components: {
    PodTile,
  },
  methods: mapActions('app', ['setPage', 'showAppBar']),
  created() {
    this.showAppBar()
    this.setPage('Podcasts')
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

  @include fluid(grid-gap, 0px, 20px, 400px, 1200px);

  @include fluid(padding-left, 50px, 100px, 801px, 1200px, false, true);
  @include fluid(padding-right, 50px, 100px, 801px, 1200px, false, true);
}
</style>
