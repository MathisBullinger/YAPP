<template>
  <button data-playing="false" role="switch" aria-checked="false" @click="toggle">
    <Icon :name="value ? 'pause' : 'play'"></Icon>
  </button>
</template>

<script>
import Component from '~scripts/component'

export default new Component({
  name: 'PlayButton',
  data() {
    return {
      value: false,
    }
  },
  methods: {
    toggle() {
      this.value = !this.value
      this.$emit('input', this.value)
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
