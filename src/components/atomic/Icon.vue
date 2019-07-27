<template>
  <object
    type="image/svg+xml"
    :data="icon"
    :style="opacity"
    @load="objLoaded"
    @click="$emit('click')"
  ></object>
</template>

<script>
import Component from '~/scripts/component'
import icons from '../../../data/icons/*.svg'

const ICON_COLOR = '#000'

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
      loaded: false,
    }
  },
  computed: {
    icon() {
      return icons[this.name]
    },
    opacity() {
      return {
        opacity: this.loaded ? 1 : 0,
      }
    },
  },
  methods: {
    objLoaded() {
      this.$el.getSVGDocument().querySelector('path').style.fill = ICON_COLOR
      this.loaded = true
    },
  },
})
</script>
