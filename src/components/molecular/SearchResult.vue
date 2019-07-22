<template>
  <div :class="getClass" @click="onClick">
    <img :src="artwork" />
    <div class="text">
      <Paragraph>{{ title }}</Paragraph>
      <Paragraph>{{ creator }}</Paragraph>
    </div>
  </div>
</template>

<script>
import Component from '/scripts/component'

export default new Component({
  name: 'SearchResult',
  props: {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: false,
    },
    artwork: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$router.push(`/podcast/${this.id}`)
    },
  },
})
</script>

<style lang="scss" scoped>
.search-result {
  width: 100vw;
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
