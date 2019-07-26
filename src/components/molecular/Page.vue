<template>
  <div :class="getClass">
    <slot></slot>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { debounce, throttle } from 'lodash'

export default new Component({
  name: 'Page',
  methods: {
    onScroll: throttle(function() {
      const scrollDelta = this.$el.scrollTop - this.lastScrollPos
      if (
        scrollDelta > 0 !== this.lastScrollDelta > 0 &&
        this.$el.scrollTop > 0 && // topmost
        this.$el.scrollHeight - this.$el.scrollTop > this.$el.offsetHeight // bottommost
      )
        this.$parent.$emit('scrollDirChange', scrollDelta)
      this.lastScrollDelta = this.$el.scrollTop - this.lastScrollPos
      this.lastScrollPos = this.$el.scrollTop
    }, 100),
  },
  data() {
    return {
      lastScrollPos: 0,
      lastScrollDelta: 0,
    }
  },
  mounted() {
    this.lastScrollPos = this.$el.scrollTop
    this.$el.addEventListener('scroll', debounce(this.onScroll), {
      passive: true,
    })
  },
})
</script>

<style lang="scss" scoped>
</style>
