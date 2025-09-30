import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/BirkmayerAerospace_Webseite/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
