const config = {
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  globals: {
    module: true,
    process: true,
    require: true,
    gtag: 'readonly',
    describe: true,
    it: true,
    expect: true,
  },
  rules: {
    'vue/max-attributes-per-line': false,
    'vue/html-closing-bracket-newline': false,
    'vue/html-indent': false,
    'vue/html-self-closing': false,
    'vue/singleline-html-element-content-newline': false,
    'vue/multiline-html-element-content-newline': false,
    'vue/array-bracket-spacing': 'always',
    'vue/arrow-spacing': { before: true, after: true },
    'vue/block-spacing': 'always',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: false },
    ],
    'vue/comma-dangle': 'only-multiline',
    'vue/no-empty-pattern': true,
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue', 'js', 'jsx'],
        shouldMatchCase: true,
      },
    ],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/space-infix-ops': ['error', { int32Hint: false }],
    'vue/v-on-function-call': ['error', 'never'],
  },
}

module.exports = config
