<template>
  <svg
    v-if="icon === 'library'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      class="icon-main"
      d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
    />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
  <svg
    v-else-if="icon === 'feed'"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      class="icon-main"
      d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
  <p v-else>unknown icon</p>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'IconSvg',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.icon-main {
  fill: white;
}
</style>
