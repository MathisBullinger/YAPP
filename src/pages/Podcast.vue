<template>
  <div :class="getClass">
    <template v-if="loaded">
      <!-- <div class="head">
        <img ref="artwork" :src="artwork" />
        <div class="right">
          <Header s2>{{ podcast.name }}</Header>
          <Paragraph>{{ podcast.creator }}</Paragraph>
        </div>
        <Icon name="nav_down" class="toggle-expand"></Icon>
      </div>-->
      <Info :id="id"></Info>
      <!-- <Divider></Divider> -->
      <ol class="episodes">
        <Episode
          v-for="episode in podcast.episodes"
          :key="episode.title"
          :episode="episode"
        ></Episode>
      </ol>
    </template>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import Info from './podcast/Info'
import Episode from './podcast/Episode'
import { mapState, mapActions } from 'vuex'

export default new Component({
  name: 'Podcast',
  props: {
    id: String,
    required: true,
  },
  components: {
    Info,
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
  .episodes {
    padding: 1.2rem;
  }
}
</style>
