// vite.config.js ULTIMA VERSION

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/class': {
        target: 'http://3.132.124.12:8080',
        changeOrigin: true,
        secure: false,
      },
      '/user-class': {
        target: 'http://3.132.124.12:8080',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://3.132.124.12:8080',
        changeOrigin: true,
        secure: false,
      },
      '/transcription': {
        target: 'http://3.132.124.12:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
