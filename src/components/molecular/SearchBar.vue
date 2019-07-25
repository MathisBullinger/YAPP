<template>
  <div :class="getClass">
    <Input v-model="search" />
    <SearchResult
      v-for="result in searchResults"
      :id="result.id"
      :key="result.id"
      :title="result.name"
      :creator="result.creator"
      :artworks="result.artworks"
    ></SearchResult>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import SearchResult from './SearchResult'
import searchQuery from '~/gql/searchPodcast'

export default new Component({
  name: 'SearchBar',
  components: {
    SearchResult,
  },
  apollo: {
    searchResults: {
      query: searchQuery,
      variables() {
        return {
          name: this.search,
        }
      },
      throttle: 700,
      skip() {
        return this.search.length < 3
      },
    },
  },
  data() {
    return {
      search: '',
      searchResults: [],
    }
  },
})
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;

  .input {
    margin: 0;
    width: 100%;
  }
}
</style>
