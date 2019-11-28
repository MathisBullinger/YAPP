module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'cut',
        'docs',
        'feat',
        'fix',
        'perf',
        'ref',
        'test',
      ],
    ],
  },
}
