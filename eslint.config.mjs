import { defineConfig } from 'eslint/config';
import next from 'eslint-config-next';

export default defineConfig([
  ...next,
  {
    rules: {
      // Console warnings
      'no-console': 'warn',

      // Unused variables warnings
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],

      // Allow 'any' type
      '@typescript-eslint/no-explicit-any': 'off',

      // React hooks
      'react-hooks/exhaustive-deps': 'warn',

      // Disable React Compiler strict rules
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/incompatible-library': 'off',

      // Disable default JS unused vars
      'no-unused-vars': 'off'
    }
  }
]);
