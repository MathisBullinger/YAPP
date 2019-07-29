<template>
  <div :class="getClass" @click="onClick">
    <Paragraph>{{ episode.title }}</Paragraph>
    <Icon name="play"></Icon>
  </div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Episode',
  props: {
    episode: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$parent.$emit('showEpisode', this.episode.id)
    },
  },
})
</script>

<style lang="scss" scoped>
.episode {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
