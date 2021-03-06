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
    indent: [2, 2, { "SwitchCase": 1 }],
    'import/no-unresolved': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-use-before-define': [2, { variables: false, functions: false }],
    'arrow-body-style': 0,
    'react/jsx-wrap-multilines': 0,
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'no-else-return': 0,
    'no-console': 0,
    'no-plusplus': 0,
  },
};
