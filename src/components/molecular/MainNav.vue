<template>
  <div :class="getClass"></div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'MainNav',
})
</script>

<style lang="scss" scoped>
.main-nav {
  background-color: yellow;
  height: 4rem;
  width: 100%;
  overflow: auto;
  display: block;
}
</style>
