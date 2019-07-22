<template>
  <div :class="getClass">
    <Input v-model="search" />
    <SearchResult
      v-for="(result, i) in searchResults"
      :id="result.id"
      :key="`result-${i}`"
      :title="result.name"
      :creator="result.creator"
      :artwork="result.artworks.filter(art => art.size >= 100)[0].url"
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
      throttle: 500,
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
  mounted() {},
})
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100vw;
  background-color: gray;
  padding: 1rem;

  .input {
    margin: 0;
    width: 100%;
  }
}
</style>
