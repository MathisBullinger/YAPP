<template>
  <div :class="getClass">
    <Paragraph>Signed in as</Paragraph>
    <Paragraph>{{ email }}</Paragraph>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState, mapActions } from 'vuex'

export default new Component({
  name: 'Profile',
  computed: mapState('user', ['email']),
  methods: mapActions('app', ['setPage', 'showAppBar', 'setPageLoading']),
  created() {
    this.showAppBar()
    this.setPage('Profile')
    this.setPageLoading(true)

    setTimeout(() => this.setPageLoading(false), 2000)
  },
})
</script>

<style lang="scss" scoped></style>
