<template>
  <button :class="getClass">
    <slot></slot>
  </button>
</template>

<script>
import Component from '/utils/component'

export default new Component({
  name: 'Button',
})
</script>

<style lang="scss" scoped>
.button {
  background-color: black;
}
</style>
