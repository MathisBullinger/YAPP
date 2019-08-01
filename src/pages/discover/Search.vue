<template>
  <div :class="getClass">
    <Input
      placeholder="Search podcast"
      @focus="inputStart"
      @blur="$parent.$emit('keyboard', false)"
      @submit="submit"
    />
    <div class="input-shadow"></div>
    <div class="result-pane"></div>
  </div>
</template>

<script>
import Component from '~scripts/component'
import { mapActions } from 'vuex'

export default new Component({
  name: 'Search',
  data() {
    return {
      active: false,
    }
  },
  methods: {
    ...mapActions('app', ['lockScroll', 'unlockScroll']),
    submit() {},
    inputStart() {
      this.$parent.$emit('keyboard', true)
      this.lockScroll()
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';
$trans: 0.2s ease;

.search {
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  .input {
    width: 100%;
    margin: 0;
    border: none;
    height: 100%;
  }

  .input-shadow {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    transform: translateY(-100%);
    border-radius: 0.25rem;
    box-shadow: none;
    pointer-events: none;
  }

  .result-pane {
    z-index: 3000;
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    background-color: white;
    height: 0;
    display: block;
    transition: height $trans, transform $trans, width $trans,
      box-shadow 0s linear 0.2s;
    box-shadow: none;
    will-change: height;
  }
  .input:focus ~ .result-pane {
    transform: none;
    width: 100%;
    height: calc(100vh - 8rem);
    box-shadow: shadow(4);
    transition: height $trans, transform $trans, width $trans, box-shadow 0s;
  }
}

.merged > .search {
  .input-shadow {
    box-shadow: shadow(2);
    transition: transform $trans, width $trans, height $trans, box-shadow $trans,
      border-radius 0s 0.2s;
  }

  .input:focus ~ .input-shadow {
    transform: translateX(-1rem) translateY(calc(-100% + 0.5rem));
    width: calc(100% + 2rem);
    height: calc(100% + 1rem);
    border-radius: 0;
    transition: transform $trans, width $trans, height $trans, border-radius 0s;
  }

  .result-pane {
    width: calc(100% - 2rem);
    transform: translateX(1rem) translateY(-0.5rem);
  }
}
</style>
