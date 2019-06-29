<template>
  <RouterLink
    v-if="['Paragraph', 'Header'].includes($parent.$options.name)"
    :class="getClass"
    v-bind="{ ...$props }"
    active-class="active"
  >
    <slot></slot>
  </RouterLink>
  <Paragraph v-else>
    <RouterLink :class="getClass" v-bind="{ ...$props }" active-class="active">
      <slot></slot>
    </RouterLink>
  </Paragraph>
</template>

<script>
import Component from '~/scripts/component'

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
