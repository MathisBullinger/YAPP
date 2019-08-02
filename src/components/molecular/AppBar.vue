<template>
  <div
    class="app-bar"
    :class="{
      hidden: !showAppBar || (scrollDir > 0 && hideAppBarOnScroll),
      animated,
      merged,
      fixed,
    }"
  >
    <template v-if="!customAppBar">
      <Icon
        v-if="navigation"
        :name="navIcon"
        class="navbutton"
        @click="navAction"
      ></Icon>
      <Header s2 class="title">{{ pageTitle }}</Header>
    </template>
    <PodSearch v-else-if="customAppBar === 'podSearch'"></PodSearch>
    <Progress v-if="showLoading" :inactive="!pageLoading"></Progress>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'
import scroll from '~/scripts/scroll'
import PodSearch from '~/pages/discover/Search'

export default new Component({
  name: 'AppBar',
  components: {
    PodSearch,
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('app', [
      'pageTitle',
      'showAppBar',
      'pageLoading',
      'hideAppBarOnScroll',
      'mergeAppBarAtTop',
      'navigation',
      'customAppBar',
    ]),
    navIcon() {
      switch (this.navigation) {
        case 'back':
          return 'nav_back'
        default:
          return null
      }
    },
  },
  data() {
    return {
      showLoading: false,
      animated: false,
      scrollDir: -1,
      merged: false,
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
    hideAppBarOnScroll(v) {
      scroll.removeFromAll(this.onScrollDirChange)
      if (v)
        scroll.addEventListener(
          typeof this.hideAppBarOnScroll !== 'number'
            ? 'dirchange'
            : `above${this.hideAppBarOnScroll}`,
          this.onScrollDirChange
        )
    },
    mergeAppBarAtTop(v) {
      if (v) scroll.addEventListener('top', this.onScrollTop)
      else {
        this.merged = false
        scroll.removeFromAll(this.onScrollTop)
      }
    },
  },
  methods: {
    onScrollDirChange(dir) {
      this.scrollDir = dir
    },
    onScrollTop(v) {
      this.merged = v
    },
    navAction() {
      switch (this.navigation) {
        case 'back':
          window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push('/')
          break
      }
    },
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
  height: 4rem;
  box-shadow: shadow(4);
  box-sizing: border-box;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  position: fixed;
  margin-bottom: 0;
  background-color: white;

  &:not(.fixed) {
    @media (orientation: 'landscape') {
      display: none;
    }
  }

  &.animated {
    $transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition: transform $transition, box-shadow $transition;

    .title {
      transition: opacity $transition;
    }
  }

  .navbutton {
    height: 1.5rem;
    margin-right: 0.5rem;
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

  &.merged {
    box-shadow: none;
    transition: box-shadow 0.2s ease;

    .title {
      opacity: 0;
      transition: opacity 0.1s ease;
    }
  }
}
</style>
