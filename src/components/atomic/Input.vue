<template>
  <input
    v-model="value"
    :aria-label="internalAriaLabel"
    :class="{
      ...getClass.reduce((a, c) => Object.assign(a, { [c]: true }), {}),
      small: small,
    }"
    :autocomplete="autocomplete"
    :type="(email && 'email') || (password && 'password') || 'text'"
    :style="size ? { width: size + 'em' } : {}"
    :placeholder="placeholder"
    @input="onInput"
    @keyup.enter="onEnter"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  />
</template>

<script>
import Component from '~/scripts/component'

export default new Component({
  name: 'Input',
  types: ['default', 'email', 'password'],
  props: {
    autocomplete: {
      type: String,
      default: 'off',
    },
    ariaLabel: {
      default: null,
      type: String,
    },
    focus: {
      default: false,
      type: Boolean,
    },
    size: {
      default: undefined,
      type: Number,
    },
    small: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: String | Number,
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    internalAriaLabel: comp =>
      comp.ariaLabel !== null ? comp.ariaLabel : comp.placeholder,
  },
  data() {
    return {
      currentFocus: false,
      value: '',
    }
  },
  watch: {
    defaultValue(v) {
      this.value = v
    },
  },
  created() {
    this.value = this.defaultValue || ''
  },
  mounted: function() {
    if (this.focus) this.$el.focus()
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
    onEnter() {
      this.$el.blur()
      this.$emit('submit')
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/styles/colors.scss';

.input {
  height: calc(1.5 * var(--baseline));
  margin-top: calc(var(--baseline) - var(--baseline) / 4);
  margin-bottom: calc(var(--baseline) - var(--baseline) / 4);
  background-color: color('surface');
  border: 0.125rem solid color('on-surface');
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.9rem;
  transition: color, background-color 0.2s ease;
  min-width: 13rem;

  &:focus {
    outline: none;
  }
}

.small {
  height: var(--baseline);
  min-width: 7rem;
  font-size: 0.7rem;
}
</style>
