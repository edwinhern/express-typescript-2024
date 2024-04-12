import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/node_modules/**', '**/commitlint.config.ts', '**/release.config.cjs', '**/index.ts'],
    },
    globals: true,
    restoreMocks: true,
  },
  plugins: [tsconfigPaths()],
});
