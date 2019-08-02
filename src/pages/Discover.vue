<template>
  <div :class="getClass">
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ut
      culpa ullam error doloribus excepturi minus minima sint facere dolores
      sunt, blanditiis vel odit non laudantium, harum maiores dolore temporibus.
    </Paragraph>
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ut
      culpa ullam error doloribus excepturi minus minima sint facere dolores
      sunt, blanditiis vel odit non laudantium, harum maiores dolore temporibus.
    </Paragraph>
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ut
      culpa ullam error doloribus excepturi minus minima sint facere dolores
      sunt, blanditiis vel odit non laudantium, harum maiores dolore temporibus.
    </Paragraph>
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ut
      culpa ullam error doloribus excepturi minus minima sint facere dolores
      sunt, blanditiis vel odit non laudantium, harum maiores dolore temporibus.
    </Paragraph>
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ut
      culpa ullam error doloribus excepturi minus minima sint facere dolores
      sunt, blanditiis vel odit non laudantium, harum maiores dolore temporibus.
    </Paragraph>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapActions } from 'vuex'

export default new Component({
  name: 'Discover',
  methods: mapActions('app', [
    'showAppBar',
    'setCustomAppBar',
    'mergeAppBarAtTop',
    'hideAppBarOnScroll',
  ]),
  created() {
    this.showAppBar()
    this.setCustomAppBar('podSearch')
    this.mergeAppBarAtTop()
    this.hideAppBarOnScroll(50)
  },
})
</script>

<style lang="scss" scoped>
.discover {
  height: 200vh;
  padding: 2rem;
}
</style>
