import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { LazyMotion, MotionConfig } from 'motion/react'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { MobileCtaBar } from '../components/MobileCtaBar'
import { PlayerProvider } from '../components/player/PlayerProvider'

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
      <PlayerProvider>
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
      {/* Leaves room under the footer for the docked podcast player; --player-h is only set while the bar is open. */}
      <div aria-hidden="true" className="bg-kauri" style={{ height: 'var(--player-h, 0px)' }} />
      {/* Leaves room for the mobile CTA bar; --cta-h is only set while it is showing. */}
      <div aria-hidden="true" className="bg-kauri" style={{ height: 'var(--cta-h, 0px)' }} />
      <MobileCtaBar />
      <ScrollRestoration />
      </PlayerProvider>
      </LazyMotion>
    </MotionConfig>
  )
}
