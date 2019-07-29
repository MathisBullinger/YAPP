<template>
  <div :class="getClass">
    <Svgicon :name="name" color="#000"></Svgicon>
  </div>
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
