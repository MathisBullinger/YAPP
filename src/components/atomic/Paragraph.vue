<template>
  <p :class="getClass">
    <slot />
  </p>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Paragraph',
})
</script>

<style lang="scss" scoped>
.paragraph {
  font-size: 1rem;
  line-height: var(--baseline);
  margin-top: var(--baseline);
  margin-bottom: var(--baseline);
}
</style>
