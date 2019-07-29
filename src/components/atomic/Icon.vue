<template>
  <svgicon :class="getClass" @click="$emit('click')" :name="name" :color="color"></svgicon>
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
  data() {
    return {
      color: '#000',
    }
  },
})
</script>
