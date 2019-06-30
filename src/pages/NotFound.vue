<template>
  <div :class="getClass">
    <Header s1>404</Header>
  </div>
</template>

<script>
import Component from '/scripts/component'

export default new Component({
  name: 'NotFound',
})
</script>

<style lang="scss" scoped>
.not-found {
  .header {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(calc(-50% - 2rem));
    font-size: 20vmin;
  }
}
</style>
