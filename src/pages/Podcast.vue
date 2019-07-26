<template>
  <div :class="getClass">
    <template v-if="loaded">
      <div class="info">
        <img ref="artwork" :src="artwork" />
        <Paragraph>{{ podcast.creator }}</Paragraph>
      </div>
    </template>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState, mapActions } from 'vuex'

export default new Component({
  name: 'Podcast',
  props: {
    id: String,
    required: true,
  },
  data() {
    return {
      loaded: false,
      podcast: {
        name: '',
        creator: '',
      },
    }
  },
  computed: {
    ...mapState('podcasts', ['podcasts']),
    artwork() {
      if (this.podcast.artworks.length === 0) return
      const minSize =
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 8
      const sorted = this.podcast.artworks.sort((a, b) => a.size - b.size)
      return (sorted.find(art => art.size >= minSize) || sorted.pop()).url
    },
  },
  methods: {
    ...mapActions('app', ['setPage', 'showAppBar', 'setPageLoading']),
    ...mapActions('podcasts', ['loadPodcast']),
  },
  async created() {
    if (this.podcasts[this.id])
      Object.assign(this.podcast, this.podcasts[this.id])
    this.setPageLoading(true)
    await this.loadPodcast(this.id)
    Object.assign(this.podcast, this.podcasts[this.id])
    this.setPageLoading(false)
    this.loaded = true
  },
  watch: {
    podcast: {
      handler() {
        if (this.podcasts[this.id].name) {
          this.showAppBar()
          this.setPage(this.podcasts[this.id].name)
        }
      },
      deep: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.podcast {
  .info {
    padding: 1rem;
    img {
      height: 8rem;
    }
  }
}
</style>
