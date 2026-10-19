import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { m } from 'motion/react'
import { contact } from '../content/site'
import { usePlayerState } from './player/playerContext'

/** Slim fixed bar below `lg` with a path to the free assessment. Sets --cta-h while visible so the layout can leave room. */
export function MobileCtaBar() {
  const { pathname } = useLocation()
  const { episode } = usePlayerState()
  const [pastFold, setPastFold] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [footerInView, setFooterInView] = useState(false)
  const [zoneInView, setZoneInView] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting))
    io.observe(footer)
    return () => io.disconnect()
  }, [pathname])

  // One observer for every [data-cta-zone]. The DOM swaps on navigation, so re-query when <main>'s children change.
  useEffect(() => {
    const inView = new Set<Element>()
    const watched = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) inView.add(e.target)
        else inView.delete(e.target)
      }
      setZoneInView(inView.size > 0)
    })
    const scan = () => {
      const zones = new Set(document.querySelectorAll('[data-cta-zone]'))
      for (const el of watched) {
        if (!zones.has(el)) {
          io.unobserve(el)
          watched.delete(el)
          inView.delete(el)
        }
      }
      for (const el of zones) {
        if (!watched.has(el)) {
          io.observe(el)
          watched.add(el)
        }
      }
      setZoneInView(inView.size > 0)
    }
    scan()
    const main = document.querySelector('main')
    const mo = new MutationObserver(scan)
    if (main) mo.observe(main, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [pathname])

  const onConnect = pathname.replace(/\/+$/, '').endsWith('/connect')
  const visible = pastFold && !footerInView && !zoneInView && !episode && !onConnect

  useEffect(() => {
    const root = document.documentElement
    const h = ref.current?.offsetHeight ?? 0
    if (visible && h > 0) root.style.setProperty('--cta-h', `${h}px`)
    else root.style.removeProperty('--cta-h')
    return () => {
      root.style.removeProperty('--cta-h')
    }
  }, [visible])

  return (
    <m.div
      ref={ref}
      data-mobile-cta
      initial={false}
      animate={{ y: visible ? '0%' : '110%' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      inert={!visible}
      aria-hidden={!visible}
      className="on-dark fixed inset-x-0 bottom-0 z-40 bg-kauri text-white lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-5 py-3">
        <Link
          to="/connect/?intent=assessment"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-signal px-5 py-2 font-semibold text-kauri focus-visible:outline-signal"
        >
          Book a free assessment
        </Link>
        <a
          href={contact.phoneHref}
          aria-label={`Call us on ${contact.phone}`}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-white/60 text-white focus-visible:outline-signal"
        >
          <Phone aria-hidden="true" className="size-5" />
        </a>
      </div>
    </m.div>
  )
}
