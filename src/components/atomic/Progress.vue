<template>
  <div :class="{...getClassObj, collapsed: collapsed || inactive}"></div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Progress',
  types: ['linear', 'circular'],
  defaultType: 'linear',
  props: {
    inactive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      collapsed: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.collapsed = false
    }, 10)
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/colors';

.progress {
  position: relative;
  width: 100%;
  height: 0.2rem;
  overflow-x: hidden;
  background-color: lighten(color('primary'), 40%);

  transition: height 0.5s ease;
  &.collapsed {
    height: 0;
  }

  &:before {
    content: '';
    position: absolute;
    background-color: color('primary');
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
      infinite;
  }

  &:after {
    content: '';
    position: absolute;
    background-color: color('primary');
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
      infinite;
    animation-delay: 1.15s;
  }

  @keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
}
</style>
