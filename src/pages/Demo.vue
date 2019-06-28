<template>
  <div :class="getClass">
    <AppLink to="components" append>Components Demo</AppLink>
  </div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Demo',
})
</script>

<style lang="scss" scoped></style>
