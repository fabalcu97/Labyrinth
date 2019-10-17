module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['plugin:react-native/all'],
  rules: {
    'react-native/no-color-literals': 0,
    'react-native/sort-styles': 0,
  },
};
