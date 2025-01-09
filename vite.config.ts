import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  server: {
    sourcemapIgnoreList: (sourcePath) => {
      return sourcePath.includes('node_modules/react-quill-new');
    },
  },
})