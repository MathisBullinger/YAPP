<template>
  <div :class="getClass" aria-label="loading"></div>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Loader',
})
</script>

<style lang="scss" scoped>
@import '/styles/colors';

.loader {
  width: 2rem;
  height: 2rem;
  border: 0.3rem solid lightgray;
  border-radius: 50%;
  border-top: 0.3rem solid color('on-surface');
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
