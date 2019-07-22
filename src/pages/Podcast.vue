<template>
  <div :class="getClass">
    <Paragraph>{{ podcasts[id].title }}</Paragraph>
    <Paragraph>{{ podcasts[id].creator }}</Paragraph>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'

export default new Component({
  name: 'Podcast',
  props: {
    id: String,
    required: true,
  },
  computed: mapState('podcasts', ['podcasts']),
})
</script>

<style lang="scss" scoped></style>
