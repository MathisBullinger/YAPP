<template>
  <div :class="getClass">
    <SearchBar></SearchBar>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import SearchBar from '~/components/molecular/SearchBar'

export default new Component({
  name: 'Discover',
  components: {
    SearchBar,
  },
})
</script>
