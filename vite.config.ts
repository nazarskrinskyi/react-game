import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import remixPlugin from "vite-plugin-remix";

export default defineConfig({
  plugins: [react(),
    remixPlugin()
  ],
  css: {
    postcss: './postcss.config.js', // Ensure PostCSS is referenced correctly
  },
});
