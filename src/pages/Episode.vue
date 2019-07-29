<template>
  <div :class="{ ...getClassObj, hidden }">
    <template v-if="episodes && id in episodes">
      <Icon name="nav_down" @click="close"></Icon>
      <img class="artwork" :src="image" />
      <div class="square"></div>
      <div class="image"></div>
      <Header s2>{{ episodes[id].title }}</Header>
    </template>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState('podcasts', ['episodes', 'podcasts']),
    image() {
      const minSize = Math.min(window.innerHeight, window.innerWidth)
      const sorted = this.podcasts[
        this.episodes[this.id].podcastId
      ].artworks.sort((a, b) => a.size - b.size)
      return (sorted.find(art => art.size >= minSize) || sorted.pop()).url
    },
  },
  methods: {
    close() {
      this.hidden = true
      setTimeout(() => this.$emit('closed'), 500)
    },
  },
  mounted() {
    setTimeout(() => (this.hidden = false), 10)
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';

.episode {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  overflow-y: scroll;
  z-index: 2000;
  background-color: white;
  transition: transform 0.4s ease-out;
  box-shadow: shadow(4);
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;

  &.hidden {
    transition: transform 0.4s ease-in;
    transform: translateY(100vh);
  }

  .artwork {
    position: relative;
    width: 50vmin;
    height: 50vmin;
    object-fit: cover;
  }
}
</style>
