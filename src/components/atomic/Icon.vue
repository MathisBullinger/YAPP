<template>
  <div :class="getClass" @click="$emit('click')">
    <IconSvg :icon="name"></IconSvg>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import IconSvg from './icon/IconSvg'

export default new Component({
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: '',
    },
    aria: {
      type: String,
      default: '',
    },
  },
  components: {
    IconSvg,
  },
})
</script>
