import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Read repo name from package.json so the base path stays in sync automatically.
// GitHub project pages are served at: username.github.io/<repo-name>/
// 'gh-pages' mode is used by `npm run build:gh` (and CI). Other builds use '/'.
import pkg from './package.json' with { type: 'json' }
const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages'
const base = isGhPages ? `/${pkg.name}/` : '/'

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
