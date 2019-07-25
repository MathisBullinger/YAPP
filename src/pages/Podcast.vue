<template>
  <div :class="getClass"></div>
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
  computed: {
    ...mapState('podcasts', ['podcasts']),
    podcast() {
      return this.podcasts[this.id]
    },
  },
  methods: mapActions('app', ['setPage', 'showAppBar', 'setPageLoading']),
  created() {
    this.showAppBar()
    if (!this.podcast) return
    this.setPage(this.podcast.title)
  },
  watch: {
    podcast({ title }) {
      this.setPage(title)
    },
  },
})
</script>

<style lang="scss" scoped>
.podcast {
  .loader {
    position: relative;
    left: calc(50% - 1rem);
    top: calc(50% - 1rem);
  }
}
</style>
