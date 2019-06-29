<template>
  <button
    :disabled="disabled"
    type="button"
    class="button"
    :class="{
      ...getClass.reduce((a, c) => Object.assign(a, { [c]: true }), {}),
      'cl-default': color === 'default',
      'cl-primary': color === 'primary',
      'cl-secondary': color === 'secondary',
    }"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Button',
  types: ['text', 'outlined', 'raised', 'unelevated'],
  defaultType: 'outlined',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'default',
    },
    link: {
      type: String,
      default: null,
    },
  },
  methods: {
    onClick({ offsetX, offsetY }) {
      this.$el.style.setProperty(
        '--ripple-off-x',
        `${(offsetX / this.$el.offsetWidth) * 100 - 50}%`
      )
      this.$el.style.setProperty(
        '--ripple-off-y',
        `${(offsetY / this.$el.offsetHeight) * 100 - 50}%`
      )

      if (!this.disabled && this.link) this.$router.push(this.link)
      if (!this.disabled) this.$emit('click')
      setTimeout(() => this.$el.blur(), 500)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/colors';
@import '~/styles/shadows';
@import '~/styles/ripple';

.button {
  display: block;
  font-size: 1rem;
  min-width: 2rem;
  height: calc(1.5 * var(--baseline));
  margin-top: calc(var(--baseline) - var(--baseline) / 4);
  margin-bottom: calc(var(--baseline) - var(--baseline) / 4);
  border-radius: 0.25rem;
  transition: color, background-color 0.2s ease;
  cursor: pointer;
  transition: all 0.2s ease;
  transition-property: box-shadow, background-color;
  position: relative;
  overflow: hidden;

  &:focus {
    outline: 0;
  }

  @include ripple();

  &.disabled {
    cursor: initial;
  }
}

.text {
  background-color: transparent;
  border: none;
  padding: 0;
  height: var(--baseline);
  margin-top: calc(var(--baseline));
  margin-bottom: calc(var(--baseline));

  &.cl-default {
    color: color('on-surface');
  }

  &.cl-primary {
    color: color('primary');
  }

  &.cl-secondary {
    color: color('secondary');
  }

  &:hover {
    &.cl-default {
      background-color: rgba(color('on-surface'), $alpha: 5%);
    }
    &.cl-primary {
      background-color: rgba(color('primary'), $alpha: 5%);
    }
    &.cl-secondary {
      background-color: rgba(color('secondary'), $alpha: 5%);
    }
  }
}

.outlined {
  background-color: color('surface');
  border-style: solid;
  border-width: 0.125rem;

  &.cl-default {
    color: color('on-surface');
    border-color: color('on-surface');

    &:hover {
      background-color: color('on-surface');
      color: color('surface');
    }
  }

  &.cl-primary {
    color: color('primary');
    border-color: color('primary');
    &:hover {
      background-color: color('primary');
      color: color('on-primary');
    }
  }

  &.cl-secondary {
    color: color('secondary');
    border-color: color('secondary');
    &:hover {
      background-color: color('secondary');
      color: color('on-secondary');
    }
  }
}

.raised,
.unelevated {
  border-style: none;
  box-shadow: shadow(2.5);

  &:hover {
    box-shadow: shadow(1);
  }

  &.cl-default {
    color: color('on-surface');
    background-color: color('surface');
    @include ripple(color('on-surface'));
  }

  &.cl-primary {
    color: color('on-primary');
    background-color: color('primary');
  }

  &.cl-secondary {
    color: color('on-secondary');
    background-color: color('secondary');
  }
}

.unelevated {
  box-shadow: none;

  &.cl-default {
    color: color('surface');
    background-color: color('on-surface');
  }

  &:hover {
    box-shadow: none;
    &.cl-default {
      background-color: lighten(color('on-surface'), 10%);
      @include ripple(color('surface'));
    }
    &.cl-primary {
      background-color: lighten(color('primary'), 10%);
    }
    &.cl-secondary {
      background-color: lighten(color('secondary'), 10%);
    }
  }
}
</style>
