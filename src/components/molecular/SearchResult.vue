<template>
  <div :class="getClass" @click="onClick">
    <img ref="thumbnail" :src="thumbnail" />
    <div class="text">
      <Paragraph>{{ name }}</Paragraph>
      <Paragraph>{{ creator }}</Paragraph>
    </div>
  </div>
</template>

<script>
import Component from '/scripts/component'
import { mapActions } from 'vuex'

export default new Component({
  name: 'SearchResult',
  props: {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: false,
    },
    artworks: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    thumbnail() {
      if (this.artworks.length === 0) return
      const minSize =
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 4
      const sorted = this.artworks.sort((a, b) => a.size - b.size)
      return (sorted.find(art => art.size >= minSize) || sorted.pop()).url
    },
  },
  methods: {
    ...mapActions('podcasts', ['setPodcast']),
    onClick() {
      this.setPodcast({
        id: this.id,
        ...(this.name && { name: this.name }),
        ...(this.creator && { creator: this.creator }),
      })
      this.$router.push(`/podcast/${this.id}`)
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
