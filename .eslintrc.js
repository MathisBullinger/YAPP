const path = require('path')

const config = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier/react'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint', 'react-hooks'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
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
    __dirname: 'readonly',
    workbox: true,
  },
  rules: {
    semi: ['error', 'never'],
    'react/prop-types': 0,
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
}

module.exports = config
