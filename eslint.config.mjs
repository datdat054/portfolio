import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'public/**',
      'assets/js/*.min.js'
    ]
  },
  js.configs.recommended,
  {
    files: ['assets/js/script.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        jQuery: 'readonly',
        Shuffle: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['scripts/**/*.mjs', 'tests/**/*.mjs', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      'no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_' }]
    }
  }
];
