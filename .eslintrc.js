module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-native'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    indent: [2, 2],
    'import/no-unresolved': 0,
    'no-trailing-spaces': [1, { skipBlankLines: true }],
    '@typescript-eslint/no-use-before-define': 0,
    'no-use-before-define': [2, { variables: false }],
    'arrow-body-style': 0,
    'react/jsx-wrap-multilines': 0,
    'import/extensions': 0,
    'global-require': 0,
  },
};
