<template>
  <div :class="getClass" @click="$emit('click')">
    <object
      ref="obj"
      type="image/svg+xml"
      :data="icon"
      :style="opacity"
      @load="objLoaded"
    ></object>
  </div>
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
      this.$refs.obj
        .getSVGDocument()
        .querySelector('path').style.fill = ICON_COLOR
      this.loaded = true
    },
  },
})
</script>

<style lang="scss" scoped>
.icon {
  object {
    pointer-events: none;
  }
}
</style>
