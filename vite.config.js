import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'tslib'],
  },
  server: {
    // Enable HMR (Hot Module Replacement)
    hmr: true,
    // Watch for changes
    watch: {
      usePolling: true,
    },
  },
  // Optimize build
  build: {
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'esbuild',
  },
})
