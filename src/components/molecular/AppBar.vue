<template>
  <div class="app-bar" :class="{ hidden: !showAppBar }">
    <Header s2 class="title">{{pageTitle}}</Header>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'

export default new Component({
  name: 'AppBar',
  computed: {
    ...mapState('app', ['pageTitle', 'showAppBar']),
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';

.app-bar {
  width: 100vw;
  height: 3.5rem;
  box-shadow: shadow(4);
  box-sizing: border-box;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding-left: 1rem;

  .title {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 100%;
  }

  &.hidden {
    height: 0;

    * {
      display: none;
    }
  }
}
</style>
