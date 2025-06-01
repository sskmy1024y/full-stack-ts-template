import { base } from '@template/eslint-config';

export default [
  ...base,
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];