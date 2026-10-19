import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import RouteErrorPage from './pages/RouteErrorPage'

// Every page is its own chunk. Paths end in a slash (the original site's URLs) and also match without it.
const lazyPage = (load: () => Promise<{ default: React.ComponentType }>): Pick<RouteObject, 'lazy'> => ({
  lazy: async () => ({ Component: (await load()).default }),
})

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <div className="h-[var(--header-h)] bg-kauri" aria-hidden="true" />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, ...lazyPage(() => import('./pages/HomePage')) },
          { path: 'new-zealand-services/', ...lazyPage(() => import('./pages/NewZealandPage')) },
          { path: 'canada-services/', ...lazyPage(() => import('./pages/CanadaPage')) },
          { path: 'process/', ...lazyPage(() => import('./pages/ProcessPage')) },
          { path: 'about/', ...lazyPage(() => import('./pages/AboutPage')) },
          { path: 'meet-the-team/', ...lazyPage(() => import('./pages/TeamPage')) },
          { path: 'success-stories/', ...lazyPage(() => import('./pages/StoriesPage')) },
          { path: 'podcast/', ...lazyPage(() => import('./pages/PodcastPage')) },
          { path: 'connect/', ...lazyPage(() => import('./pages/ConnectPage')) },
          { path: '*', ...lazyPage(() => import('./pages/NotFoundPage')) },
        ],
      },
    ],
  },
], {
  // Matches Vite's base path, so routes resolve under /secure_visa_v2/ on GitHub Pages.
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
})

export default function App() {
  return <RouterProvider router={router} />
}
