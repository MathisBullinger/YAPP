<template>
  <div :class="getClass">
    <Paragraph>Signed in as</Paragraph>
    <Paragraph>{{ email }}</Paragraph>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import { mapState } from 'vuex'

export default new Component({
  name: 'Profile',
  computed: mapState('user', ['email']),
})
</script>

<style lang="scss" scoped></style>
