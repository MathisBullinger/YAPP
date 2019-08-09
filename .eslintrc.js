const config = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier/react'],
  plugins: ['prettier'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  globals: {
    module: true,
    process: true,
    require: true,
    gtag: 'readonly',
    describe: true,
    it: true,
    expect: true,
    gapi: 'readonly',
  },
  rules: {
    semi: ['error', 'never'],
    'react/prop-types': 0,
    'no-console': 'warn',
  },
}

module.exports = config
