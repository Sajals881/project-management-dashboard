import { defineConfig } from 'vite';
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  base: '/project-management-dashboard/',
  build: {
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'github-pages-404',
      closeBundle() {
        const out = join(process.cwd(), 'dist');
        const index = join(out, 'index.html');
        const notFound = join(out, '404.html');
        if (existsSync(index)) {
          copyFileSync(index, notFound);
        }
      },
    },
  ],
});

