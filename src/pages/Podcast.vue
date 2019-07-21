<template>
  <div :class="getClass">{{ id }}</div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Podcast',
  props: {
    id: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
