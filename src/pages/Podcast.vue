<template>
  <div :class="getClass">
    <template v-if="loaded">
      <div class="head">
        <div>
          <Header s2>{{podcast.name}}</Header>
          <Paragraph>{{podcast.creator}}</Paragraph>
        </div>
        <img ref="artwork" :src="artwork" />
      </div>
      <Divider></Divider>
      <ol class="episodes">
        <Episode v-for="episode in podcast.episodes" :key="episode.title" :episode="episode"></Episode>
      </ol>
    </template>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import Episode from './podcast/Episode'
import { mapState, mapActions } from 'vuex'

export default new Component({
  name: 'Podcast',
  props: {
    id: String,
    required: true,
  },
  components: {
    Episode,
  },
  data() {
    return {
      loaded: false,
      podcast: {
        name: '',
        creator: '',
        episodes: [],
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
  .head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem;

    img {
      width: 8rem;
      height: 8rem;
    }
  }

  .episodes {
    padding: 1rem;
  }
}
</style>
