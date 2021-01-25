module.exports = {
  linters: {
    '**/*.+(ts|tsx)': ['npx eslint --fix', 'prettier --write .', 'git add']
  }
}
