<template>
  <SvgIcon
    :class="getClass"
    :name="name"
    :color="color"
    @click="$emit('click')"
  ></SvgIcon>
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
