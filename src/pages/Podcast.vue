<template>
  <div :class="getClass">
    <Progress></Progress>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'

export default new Component({
  name: 'Podcast',
  props: {
    id: String,
    required: true,
  },
  computed: mapState('podcasts', ['podcasts']),
})
</script>

<style lang="scss" scoped>
.podcast {
  .loader {
    position: relative;
    left: calc(50% - 1rem);
    top: calc(50% - 1rem);
  }
}
</style>
