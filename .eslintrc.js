module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,

  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    rules: {
      'import/prefer-default-export': 'off',
      'class-methods-use-this': 'off',
      'consistent-return': 'off',
      camelcase: 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    },
  },
};
