<template>
  <div class="app-bar" :class="{ hidden: !showAppBar }">
    <Header s2 class="title">{{pageTitle}}</Header>
    <Progress v-if="showLoading" :inactive="!pageLoading"></Progress>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'

export default new Component({
  name: 'AppBar',
  computed: {
    ...mapState('app', ['pageTitle', 'showAppBar', 'pageLoading']),
  },
  data() {
    return {
      showLoading: false,
    }
  },
  watch: {
    pageLoading(v) {
      if (v) this.showLoading = true
      else
        setTimeout(() => {
          if (!this.pageLoading) this.showLoading = false
        }, 1000)
    },
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
  position: relative;

  .title {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 100%;
  }

  .progress {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  &.hidden {
    height: 0;

    .progress {
      bottom: initial;
      top: 100%;
    }

    *:not(.progress) {
      display: none;
    }
  }
}
</style>
