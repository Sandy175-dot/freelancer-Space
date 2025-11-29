import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'tslib'],
  },
  server: {
    // Disable caching during development
    headers: {
      'Cache-Control': 'no-store',
    },
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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
        },
      },
    },
  },
})
