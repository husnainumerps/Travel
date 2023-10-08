module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always']
  },
  ignorePatterns: ['public/*']
};
