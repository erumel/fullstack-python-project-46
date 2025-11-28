import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'], languageOptions: { globals: globals.node },
    rules: {
      'indent': ['error', 2],
      'arrow-parens': ['error', 'as-needed'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
      'no-multiple-empty-lines': ['error', {
        max: 2,
        maxBOF: 0,
        maxEOF: 0,
      }],
      'eol-last': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },

        { blankLine: 'always', prev: 'function', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'keyword-spacing': ['error', {
        before: true,
        after: true,
      }],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'space-in-parens': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'brace-style': ['error', '1tbs'],
      'space-infix-ops': 'error',
      'space-before-blocks': 'error',
      'padded-blocks': ['error', 'never'],
    },
  },
])
