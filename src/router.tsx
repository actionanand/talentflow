import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Vite injects import.meta.env.BASE_URL from the `base` config in vite.config.ts.
// In production (GitHub Pages) this is '/talentflow/', locally it's '/'.
// TanStack Router needs the same value as `basepath` so all <Link> hrefs
// and route matching include the sub-path prefix.
const basepath = import.meta.env.BASE_URL ?? '/'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    basepath,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
