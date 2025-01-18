import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vitest.config.ts',
    test: {
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [
          { browser: 'chromium', name: 'chromium' },
        ],
      },
    },
  },
])
