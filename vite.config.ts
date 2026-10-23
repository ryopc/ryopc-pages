import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Root path for custom domain or Cloudflare Pages.
  base: '/',
  plugins: [react()],
});
