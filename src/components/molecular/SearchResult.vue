<template>
  <div :class="getClass">
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
  },
})
</script>

<style lang="scss" scoped>
.search-result {
  width: 100vw;
  display: flex;
  margin-top: 1rem;

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
