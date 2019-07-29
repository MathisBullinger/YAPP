<template>
  <svgicon :class="getClass" @click="$emit('click')" :name="name" color="#000"></svgicon>
</template>

<script>
import Component from '~/scripts/component'
import '../icons/*.js'

export default new Component({
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
})
</script>
