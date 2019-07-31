<template>
  <div
    class="app-bar"
    :class="{
      hidden: !showAppBar || (scrollDir > 0 && hideAppBarOnScroll),
      animated,
    }"
  >
    <Header s2 class="title">{{ pageTitle }}</Header>
    <Progress v-if="showLoading" :inactive="!pageLoading"></Progress>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'
import scroll from '~/scripts/scroll'

export default new Component({
  name: 'AppBar',
  computed: {
    ...mapState('app', [
      'pageTitle',
      'showAppBar',
      'pageLoading',
      'hideAppBarOnScroll',
    ]),
  },
  data() {
    return {
      showLoading: false,
      animated: false,
      scrollDir: -1,
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
    showAppBar(v) {
      if (!v) this.animated = false
      else setTimeout(() => (this.animated = true), 100)
    },
  },
  methods: {
    onScrollDirChange(dir) {
      this.scrollDir = dir
    },
  },
  created() {
    scroll.addEventListener('dirchange', this.onScrollDirChange)
  },
  mounted() {
    setTimeout(() => (this.animated = true), 100)
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
  position: fixed;
  margin-bottom: 0;
  background-color: white;

  @media (orientation: 'landscape') {
    display: none;
  }

  &.animated {
    $transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition: transform $transition, box-shadow $transition;
  }

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
    box-shadow: none;
    transform: translateY(-3.5rem);

    .progress {
      bottom: initial;
      top: 100%;
    }
  }
}
</style>
