<template>
  <RouterLink :class="getClass" v-bind="{ ...$props }" active-class="active">
    <slot></slot>
  </RouterLink>
</template>

<script>
import Component from '/utils/component'

export default new Component({
  name: 'Link',
  props: {
    // https://router.vuejs.org/api/#router-link-props
    to: {
      type: String,
      required: true,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.link.active {
  color: initial;
}
</style>
