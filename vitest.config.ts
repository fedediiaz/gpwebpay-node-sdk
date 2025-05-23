/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'lcov']
      // thresholds: {
      //   lines: 95,
      //   branches: 95,
      //   functions: 95,
      //   statements: 95,
      // },
    },

  },
  plugins: [tsconfigPaths()],
});