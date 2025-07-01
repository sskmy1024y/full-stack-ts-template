import { node } from '@template/eslint-config'

const config = [
  ...node,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'off', // Allow console statements in tests
    },
  },
]

export default config
