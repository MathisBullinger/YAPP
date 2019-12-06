module.exports = {
  hooks: {
    'pre-commit': 'npm run lint && circleci config validate',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
}
