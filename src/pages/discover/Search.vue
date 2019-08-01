<template>
  <div :class="getClass">
    <Input
      placeholder="Search podcast"
      @focus="$parent.$emit('keyboard', true)"
      @blur="$parent.$emit('keyboard', false)"
    />
  </div>
</template>

<script>
import Component from '~scripts/component'

export default new Component({
  name: 'Search',
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';

.search {
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  .input {
    width: 100%;
    margin: 0;
    border: none;
    transition: box-shadow 0.2s ease;
    height: 100%;
  }
}

.merged > .search {
  .input {
    box-shadow: shadow(2);
  }
}
</style>
