const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Disallow parent-relative imports; prefer alias `@/`
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**'],
              message: 'Use @/ absolute imports instead of parent-relative paths.',
            },
          ],
        },
      ],
      // Disabled: blank line before multi-line return statements
      'local/blank-line-before-multiline-return': 'off',
      curly: ['error', 'all'],
      // 'react-native/no-unused-styles': 'error', // Enable when plugin supports ESLint flat config
    },
  },
]);
