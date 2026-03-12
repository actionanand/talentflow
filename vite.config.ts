import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Read repo name from package.json so the base path stays in sync automatically.
// GitHub project pages are served at: username.github.io/<repo-name>/
// Change to '/' if using a custom domain or a user/org root page.
import pkg from './package.json' with { type: 'json' }
const base = process.env.NODE_ENV === 'production' ? `/${pkg.name}/` : '/'

export default defineConfig({
  base,
  plugins: [
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    TanStackRouterVite(),
    viteReact(),
  ],
  build: {
    outDir: 'dist',
  },
})
