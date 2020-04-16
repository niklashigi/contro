module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {

    // Disabled rules
    'no-undef': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',

    // Customized rules
    'indent': ['error', 2],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],

    'import/order': ['error', {
      'groups': ['external', 'internal'],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc' },
    }],

    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'none' },
      singleline: { delimiter: 'comma', requireLast: false },
    }],
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
    }],

  },
}
