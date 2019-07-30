<template>
  <button role="switch" :aria-checked="value" @click="toggle">
    <Icon :name="value ? 'pause' : 'play'"></Icon>
  </button>
</template>

<script>
import Component from '~scripts/component'

export default new Component({
  name: 'PlayButton',
  props: {
    value: {
      type: Boolean,
    },
  },
  methods: {
    toggle() {
      this.$emit('input', !this.value)
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
}
</style>
