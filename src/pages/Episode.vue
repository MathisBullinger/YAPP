<template>
  <div :class="{...getClassObj, hidden}"></div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Episode',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hidden: true,
    }
  },
  mounted() {
    setTimeout(() => (this.hidden = false), 10)
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';

.episode {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  z-index: 2000;
  top: 0;
  background-color: white;
  transition: top 0.4s ease-out;
  will-change: top;
  box-shadow: shadow(4);

  &.hidden {
    top: 100%;
  }
}
</style>
