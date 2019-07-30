<template>
  <div :class="getClass">
    <Input
      v-model="search"
      @focus="$parent.$emit('keyboard', true)"
      @blur="$parent.$emit('keyboard', false)"
    />
    <SearchResult
      v-for="result in searchResults"
      :id="result.id"
      :key="result.id"
      :name="result.name"
      :creator="result.creator"
      :artworks="result.artworks"
    ></SearchResult>
  </div>
</template>

<script>
import Component from '~/scripts/component'
import SearchResult from './SearchResult'
import searchQuery from '~/gql/searchPodcast'
import { mapActions } from 'vuex'

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
  computed: {
    loading() {
      return this.$apollo.loading
    },
  },
  data() {
    return {
      search: '',
      searchResults: [],
    }
  },
  methods: mapActions('app', ['showAppBar', 'setPageLoading']),
  watch: {
    loading(v) {
      this.setPageLoading(v)
    },
  },
  created() {
    this.showAppBar()
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
    width: calc(100% - 2rem);

    position: fixed;

    &:focus {
      position: absolute;
    }
  }
}
</style>
