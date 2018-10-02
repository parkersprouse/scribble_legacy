module.exports = {
  root: true,

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],

  rules: {
    camelcase: 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/attribute-hyphenation': 'error',
    'vue/html-end-tags': 'error',
    'vue/html-indent': 'error',
    'vue/mustache-interpolation-spacing': 'error'
  }
}
