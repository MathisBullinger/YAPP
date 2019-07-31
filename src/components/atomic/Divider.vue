<template>
  <hr :class="getClass" />
</template>

<script>
import Component from '~scripts/component'

export default new Component({
  name: 'Divider',
})
</script>

<style lang="scss" scoped>
hr {
  margin: 0;
  height: 1px;
  border: none;
  background-color: #cfd8dc;
}
</style>
