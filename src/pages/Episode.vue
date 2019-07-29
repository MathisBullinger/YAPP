<template>
  <div :class="{...getClassObj, hidden}">
    <template v-if="episodes && id in episodes">
      <Icon name="nav_down" @click="close"></Icon>
      <img class="artwork" :src="image" />
      <div class="square"></div>
      <div class="image"></div>
      <Header s2>{{episodes[id].title}}</Header>
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
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: hidden;

  &.hidden {
    transition: top 0.4s ease-in;
    top: 100%;
  }

  .artwork {
    position: relative;
    width: 50vmin;
    height: 50vmin;
    object-fit: cover;
  }
}
</style>
