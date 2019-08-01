<template>
  <div :class="getClass"></div>
</template>

<script>
import Component from '~/scripts/component'
import { mapActions } from 'vuex'

export default new Component({
  name: 'Discover',
  methods: mapActions('app', [
    'showAppBar',
    'setCustomAppBar',
    'mergeAppBarAtTop',
  ]),
  created() {
    this.showAppBar()
    this.setCustomAppBar('podSearch')
    this.mergeAppBarAtTop()
  },
})
</script>

<style lang="scss" scoped>
.discover {
  height: 200vh;
}
</style>
