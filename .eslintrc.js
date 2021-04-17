// module.exports = {
// 	extends: 'standard',
// 	rules: {
// 		'no-tabs': 0,
// 		'indent': ['error', 'tab'],
// 		'import/no-webpack-loader-syntax': 0,
// 		'no-console': ['error', {allow: ['warn', 'error']}]
// 	}
// }

module.exports = {
  env: {
    // node: true,
    es6: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  globals: {
    process: true,
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: '15.0', // React version, default to the latest React stable release
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: ['forbidExtraProps'], // The names of any functions used to wrap the
    // propTypes object, e.g. `forbidExtraProps`.
    // If this isn't set, any propTypes wrapped in
    // a function will be skipped.
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-tabs': 0,
    'prop-types': [0],
    "arrow-spacing": 2,

    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ["error", { "before": false, "after": true }],
    'object-curly-spacing': ['error', 'always'],
    semi: ['error', 'never'],
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    'max-len': [
      'error',
      { code: 120, ignoreComments: true, ignoreTrailingComments: true },
    ],

  },
  
}
