<template>
  <div :class="getClass">
    <Input
      placeholder="Search podcast"
      @focus="$parent.$emit('keyboard', true)"
      @blur="$parent.$emit('keyboard', false)"
    />
    <div class="input-shadow"></div>
    <div class="expanded"></div>
  </div>
</template>

<script>
import Component from '~scripts/component'

export default new Component({
  name: 'Search',
  data() {
    return {
      active: false,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/shadows';
$trans: 0.2s linear;

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
    box-shadow: none;
    pointer-events: none;
  }

  .expanded {
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
  }
  .input:focus ~ .expanded {
    transform: none;
    width: 100%;
    height: calc(100vh - 8rem);
    box-shadow: shadow(4);
    transition: height $trans, transform $trans, width $trans, box-shadow 0s;
  }
}

.merged > .search {
  .input-shadow {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
    transform: translateY(-100%);
    box-shadow: shadow(2);
    border-radius: 0.25rem;
    transition: transform $trans, width $trans, height $trans,
      border-radius 0s 0.2s;
  }

  .input:focus ~ .input-shadow {
    transform: translateX(-1rem) translateY(calc(-100% + 0.5rem));
    width: calc(100% + 2rem);
    height: calc(100% + 1rem);
    border-radius: 0;
    transition: transform $trans, width $trans, height $trans, border-radius 0s;
  }

  .expanded {
    width: calc(100% - 2rem);
    transform: translateX(1rem) translateY(-0.5rem);
  }
}
</style>
