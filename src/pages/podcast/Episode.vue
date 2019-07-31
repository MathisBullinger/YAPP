<template>
  <li :class="getClass">
    <div class="left" @click="onClick">
      <Paragraph>{{ episode.title }}</Paragraph>
    </div>
    <div class="right" @click="onPlay">
      <Icon name="play"></Icon>
    </div>
  </li>
</template>

<script>
import Component from '~/scripts/component'
import { mapActions } from 'vuex'

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
    onPlay() {
      this.request(this.episode.id)
    },
    ...mapActions('player', ['request']),
  },
})
</script>

<style lang="scss" scoped>
.episode {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 4rem;

  .left,
  .right {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    * {
      margin: 0;
    }
  }

  .left {
    flex-grow: 1;
  }

  .right {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-right: -1rem;
  }
}
</style>
