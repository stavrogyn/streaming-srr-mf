import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        'widget-remote': 'http://localhost:3001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/client',
    manifest: true,
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/client/entry-client.tsx'),
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  ssr: {
    noExternal: ['react', 'react-dom'],
  },
});
