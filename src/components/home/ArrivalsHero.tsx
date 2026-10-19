import { useCallback, useEffect, useReducer, useRef, useState, useSyncExternalStore } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import clsx from 'clsx'
import { boardArrivals } from '../../content/arrivals'
import { homeHero } from '../../content/home'
import { brand, funnel, icef, partners } from '../../content/site'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { Img } from '../Img'
import { SplitFlapCell } from './SplitFlapCell'
import { imageUrl } from '../../lib/imageUrl'
import './board.css'

const ADVANCE_MS = 6000
/** The whole intro is one sequence: the last cell settles at about 1.7s. */
const INTRO_MS = 1800
const NAME_CELLS = 14

/** Short names that fit the 14-cell passenger column. Each is the name as written on the sign, shortened only by dropping a surname. */
const BOARD_NAMES: Record<string, string> = {
  'raz-family': 'RAZ FAMILY',
  'julie-mercado': 'JULIE MERCADO',
  'miranda-family': 'MIRANDA FAMILY',
  'jesy-allen': 'JESY & ALLEN',
  'kim-barnes': 'KIM BARNES',
  'jade-molina': 'JADE MOLINA',
  'grace-john': 'GRACE & JOHN',
  'jhilyn-de-la-cruz': 'JHILYN CRUZ',
}

const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia('(min-width: 640px)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getWide = () => window.matchMedia('(min-width: 640px)').matches

function useRowCount() {
  const wide = useSyncExternalStore(subscribeWide, getWide, () => true)
  return wide ? 6 : 3
}

function useDocumentVisible() {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener('visibilitychange', cb)
      return () => document.removeEventListener('visibilitychange', cb)
    },
    () => document.visibilityState === 'visible',
    () => true,
  )
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

type PhotoState = { cur: number; prev: number }
function photoReducer(s: PhotoState, next: number): PhotoState {
  return s.cur === next ? s : { cur: next, prev: s.cur }
}

function pad(text: string, length: number) {
  return text.padEnd(length, ' ')
}

function CellRun({ text, row, offset, animate }: { text: string; row: number; offset: number; animate: boolean }) {
  return (
    <span className="board-group">
      {Array.from(text).map((ch, i) => (
        <SplitFlapCell
          key={i}
          char={ch}
          animate={animate}
          delay={Math.max(row, 0) * 110 + (offset + i) * 22}
          flips={2 + ((offset + i) % 3)}
        />
      ))}
    </span>
  )
}

export function ArrivalsHero() {
  const reduced = useReducedMotion() ?? false
  const rowCount = useRowCount()
  const rows = boardArrivals.slice(0, rowCount)

  const [photo, selectPhoto] = useReducer(photoReducer, { cur: 0, prev: 0 })
  const [introDone, setIntroDone] = useState(reduced)
  const [hovering, setHovering] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [boardRef, inView] = useInView<HTMLDivElement>()
  const tabVisible = useDocumentVisible()

  // Derived, not synced: if the viewport shrinks to fewer rows, the selected row clamps.
  const cur = Math.min(photo.cur, rows.length - 1)
  const running = !reduced && introDone && inView && tabVisible && !hovering && !focusWithin && !pinned && !userPaused

  useEffect(() => {
    if (reduced) return
    const t = window.setTimeout(() => setIntroDone(true), INTRO_MS)
    return () => window.clearTimeout(t)
  }, [reduced])

  // Preload the photo that comes next, so the cross-fade never waits on the network.
  useEffect(() => {
    const next = boardArrivals[(cur + 1) % rows.length]
    const img = new Image()
    img.src = imageUrl(next.image)
  }, [cur, rows.length])

  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => selectPhoto((cur + 1) % rows.length), ADVANCE_MS)
    return () => window.clearTimeout(t)
  }, [running, cur, rows.length])

  const select = useCallback((i: number) => selectPhoto(i), [])
  const animateIntro = !reduced && !introDone
  const current = boardArrivals[cur]
  const previous = boardArrivals[Math.min(photo.prev, rows.length - 1)]

  return (
    <section aria-labelledby="home-hero-title" className="on-dark overflow-x-clip bg-kauri text-white">
      <Container className="grid gap-x-10 gap-y-5 pb-8 pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-14 lg:pb-20 lg:pt-14">
        <h1
          id="home-hero-title"
          className="font-display text-[clamp(2.125rem,4.4vw,4rem)] lg:col-start-1 lg:row-start-1 lg:self-end"
        >
          {brand.heroHeadline}
        </h1>

        {/* Photo and board read as one object: the board overlaps the photo's lower edge. */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="relative aspect-[16/9] overflow-hidden rounded-photo bg-kauri-2 sm:aspect-[16/10] lg:aspect-[16/11]">
            {previous && previous !== current ? (
              <Img
                key={previous.id}
                name={previous.image}
                alt=""
                sizes="(min-width: 1024px) 640px, 100vw"
                className="absolute inset-0 size-full object-cover object-[50%_30%]"
              />
            ) : null}
            <Img
              key={current.id}
              name={current.image}
              alt={current.alt}
              priority={cur === 0}
              sizes="(min-width: 1024px) 640px, 100vw"
              className={clsx(
                'absolute inset-0 size-full object-cover object-[50%_30%]',
                previous !== current && 'board-photo-in',
              )}
            />
            <p className="absolute left-3 top-3 max-w-[calc(100%-4.5rem)] rounded-full bg-kauri/85 px-3.5 py-1.5 text-[0.9375rem] font-medium leading-snug text-white">
              {current.name}, Auckland Airport
            </p>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                className="absolute right-2 top-2 inline-flex size-11 items-center justify-center rounded-full bg-kauri/85 text-white hover:bg-kauri"
              >
                {userPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
                <span className="sr-only">{userPaused ? 'Resume the arrivals photos' : 'Pause the arrivals photos'}</span>
              </button>
            ) : null}
          </div>

          <div
            ref={boardRef}
            className="board-wrap relative z-10 mx-1.5 -mt-5 sm:mx-6 lg:mx-8 lg:-mt-24"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onFocus={() => setFocusWithin(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false)
            }}
          >
            <div className="board rounded-card px-4 pb-4 pt-4 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
              <div className="font-board flex items-center justify-between px-1 pb-1 pt-1 text-[1.125rem] leading-none tracking-[0.16em] text-signal sm:text-[1.375rem]">
                <p>ARRIVALS</p>
                <p>AUCKLAND</p>
              </div>
              <div className="board-cols font-board mb-1.5 mt-3.5 leading-none text-signal/70" aria-hidden="true">
                <span className="text-[0.75rem]">FROM</span>
                <span className="text-[0.75rem]">PASSENGER</span>
                <span className="text-[0.75rem]">STATUS</span>
              </div>
              <ul className="flex flex-col gap-[0.22em]" aria-label="Families who have landed. Choose one to see their arrival photo.">
                {rows.map((a, r) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      aria-pressed={r === cur}
                      aria-label={`Show ${a.name}'s arrival photo`}
                      onClick={() => {
                        select(r)
                        setPinned(true)
                      }}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && select(r)}
                      onFocus={() => select(r)}
                      className="board-row board-cols font-board w-full cursor-pointer rounded-[0.18em] py-[0.03em] text-left text-[1em]"
                      style={{ display: 'grid' }}
                    >
                      <CellRun text={a.origin} row={r} offset={0} animate={animateIntro} />
                      <CellRun text={pad(BOARD_NAMES[a.id] ?? a.name.toUpperCase().slice(0, NAME_CELLS), NAME_CELLS)} row={r} offset={3} animate={animateIntro} />
                      <CellRun text={a.status} row={r} offset={17} animate={animateIntro} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="max-w-[46ch] text-[1.125rem] leading-relaxed text-white/90">{homeHero.lead}</p>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-7">
            <ButtonLink href={funnel.nzVideo.href} variant="onDark">
              {funnel.nzVideo.label}
            </ButtonLink>
            <ButtonLink href="#find-your-route" variant="ghost" onClick={scrollToRoute}>
              Find your route
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-[0.9375rem] text-white/85">
            <a
              href={icef.link}
              className="flex items-center gap-3 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Img name={icef.badge} alt="" className="h-14 w-auto shrink-0 rounded-[6px] bg-white p-1" />
              <span>ICEF accredited agency #{icef.agencyNumber}</span>
            </a>
            <p className="sm:border-l sm:border-line-dark sm:pl-8">
              {partners.institutions} {partners.institutionsLabel}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** Smooth scroll respects reduced motion through the global CSS rule. Falls back to the browser's anchor jump. */
function scrollToRoute(event: React.MouseEvent<HTMLAnchorElement>) {
  const el = document.getElementById('find-your-route')
  if (!el) return
  event.preventDefault()
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  el.focus({ preventScroll: true })
}
