import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === "production" ? "https://devinneleigh.github.io/DM-Portfolio/dist/" : "/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Hide deprecation warnings from dependencies like Bootstrap
        quietDeps: true
      }
    }
  },
  build: {
    // Optional: adjust chunk size warning if needed
    chunkSizeWarningLimit: 1000, // in KB, default is 500
  }
}))
