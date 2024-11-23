// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: './', // Ensures correct paths in the `dist` folder
//   build: {
//     outDir: 'dist', // Default output folder
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      input: './index.html',
    },
  },
});

