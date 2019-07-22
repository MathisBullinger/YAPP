<template>
  <div :class="getClass">
    <Icon name="library" @click="$router.push('/podcasts')"></Icon>
    <Icon name="feed" @click="$router.push('/')"></Icon>
    <Icon name="search" @click="$router.push('/')"></Icon>
    <Icon name="account" @click="$router.push('/profile')"></Icon>
  </div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'MainNav',
})
</script>

<style lang="scss" scoped>
.main-nav {
  background-color: gray;
  height: 4rem;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  .icon {
    cursor: pointer;
  }

  @media screen and (min-width: 500px) {
    width: 5rem;
    height: 100%;
    flex-direction: column;
  }
}
</style>
