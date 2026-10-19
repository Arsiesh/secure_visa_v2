import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { LazyMotion, MotionConfig } from 'motion/react'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

const loadFeatures = () => import('../lib/motionFeatures').then((r) => r.default)

export function RootLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // After a client-side navigation, move focus to <main> so keyboard and screen-reader users start at the new page.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-signal px-5 py-3 font-semibold text-kauri transition-transform focus:translate-y-0 focus-visible:outline-kauri"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
      </LazyMotion>
    </MotionConfig>
  )
}
