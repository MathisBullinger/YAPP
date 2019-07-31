<template>
  <div :class="getClass">
    <div class="head">
      <img class="artwork" :src="artwork" />
      <div class="right">
        <Header s2 class="title">{{ podcasts[id].name }}</Header>
        <Paragraph>{{ podcasts[id].creator }}</Paragraph>
      </div>
    </div>
    <div ref="expandable" class="additional" :style="expandableHeight">
      <Paragraph class="description">{{ podcasts[id].description }}</Paragraph>
    </div>
    <Divider></Divider>
    <div class="tools">
      <Icon
        :name="expanded ? 'nav_up' : 'nav_down'"
        @click="toggleExpand"
      ></Icon>
    </div>
    <Divider></Divider>
  </div>
</template>

<script>
import Component from '~scripts/component'
import { mapState } from 'vuex'

export default new Component({
  name: 'Info',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
  computed: {
    ...mapState('podcasts', ['podcasts']),
    artwork() {
      if (!this.podcasts) return
      const sorted = this.podcasts[this.id].artworks
        .filter(art => art.size)
        .sort((a, b) => a.size - b.size)
      if (sorted.length === 0) return this.podcasts[this.id].artworks[0].url
      return (
        sorted.find(art => art.size >= window.innerWidth * 0.3) || sorted.pop()
      ).url
    },
    expandableHeight() {
      return !this.expanded
        ? {}
        : { height: this.$refs.expandable.scrollHeight + 'px' }
    },
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded
    },
  },
  mounted() {
    // this.$refs.expandable.style.height
    // console.log(document.styleSheets)
    // const expandable = this.$refs.expandable
    // console.log(expandable.style.display)
    // expandable.style.display = 'none'
    // expandable.classList.add('expanded')
    // expandable.style.
  },
})
</script>

<style lang="scss" scoped>
.info {
  .head {
    padding: 1.2rem;
    position: relative;
    display: flex;

    .artwork {
      width: 30vw;
      height: 30vw;
    }

    .right {
      padding-left: 1.5rem;
      padding-top: 0.5rem;

      * {
        margin: 0;
      }

      .title {
        margin-bottom: 0.5rem;
      }
    }
  }

  .additional {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    height: 0;
    box-sizing: border-box;
    overflow-y: hidden;
    transition: height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .tools {
    margin: 0.5rem;
    margin-left: 1.2rem;
  }
}
</style>
