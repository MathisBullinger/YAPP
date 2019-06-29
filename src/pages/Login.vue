<template>
  <div :class="getClass">
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
  </div>
</template>

<script>
import Component from '/scripts/component'

export default new Component({
  name: 'Login',
})
</script>

<style lang="scss" scoped>
.login {
  height: calc(100% - 4rem);

  .g-signin2 {
    height: 2rem;
  }
}
</style>
