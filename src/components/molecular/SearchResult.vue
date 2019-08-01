<template>
  <div :class="getClass" @click="onClick">
    <img ref="thumbnail" :src="thumbnail" />
    <div class="text">
      <Paragraph>{{ podcast.name }}</Paragraph>
      <Paragraph>{{ podcast.creator }}</Paragraph>
    </div>
  </div>
</template>

<script>
import Component from '/scripts/component'
import { mapActions } from 'vuex'

export default new Component({
  name: 'SearchResult',
  props: {
    podcast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    thumbnail() {
      if (this.podcast.artworks.length === 0) return
      const minSize =
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 4
      const sorted = this.podcast.artworks.sort((a, b) => a.size - b.size)
      return (sorted.find(art => art.size >= minSize) || sorted.pop()).url
    },
  },
  methods: {
    ...mapActions('podcasts', ['setPodcast']),
    ...mapActions('app', ['unlockScroll']),
    onClick() {
      this.setPodcast({
        id: this.podcast.itunesId,
        ...(this.podcast.name && { name: this.podcast.name }),
        ...(this.podcast.creator && { creator: this.podcast.creator }),
      })
      this.unlockScroll()
      this.$router.push(`/podcast/${this.podcast.itunesId}`)
    },
  },
})
</script>

<style lang="scss" scoped>
.search-result {
  width: 100%;
  display: flex;
  margin-top: 1rem;
  cursor: pointer;

  img {
    height: 4rem;
  }

  .text {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    * {
      margin: 0;
    }
  }
}
</style>
