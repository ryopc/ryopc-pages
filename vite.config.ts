import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths let this site run at a GitHub Pages project URL.
  base: './',
  plugins: [react()],
});
