import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import clsx from 'clsx'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { processSteps, type ProcessStep } from '../../content/process'
import { Container } from '../Container'
import { Img } from '../Img'

const stepId = (step: number) => `gate-${step}`

type GateButtonProps = {
  step: ProcessStep
  /** The gate the visitor is currently at. */
  active: boolean
  /** The plane has reached or passed this gate. */
  passed: boolean
  onSelect: (index: number) => void
}

const LAST = processSteps.length - 1
const PLANE_PATH =
  'M21.5 12c0 .9-.8 1.4-1.8 1.4h-5.2l-4.3 6.6H8.2l2.4-6.6H5.8l-1.5 2.2H2.8l.8-3.6-.8-3.6h1.5l1.5 2.2h4.8L8.2 4h2l4.3 6.6h5.2c1 0 1.8.5 1.8 1.4z'

/** Top-down plane; its nose points right, so rotate it 90deg to point down the rail. */
function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={PLANE_PATH} fill="currentColor" stroke="var(--color-paper)" strokeWidth="1" />
    </svg>
  )
}

function DesktopGate({ step, active, passed, onSelect }: GateButtonProps) {
  return (
    <li className="relative pl-9">
      <span
        aria-hidden="true"
        className={clsx(
          'absolute top-[21px] left-[6px] z-0 size-3 rounded-full border-2 transition-colors duration-200',
          passed ? 'border-kauri bg-kauri' : 'border-ink-muted/60 bg-paper',
        )}
      />
      <button
        type="button"
        onClick={() => onSelect(step.step - 1)}
        aria-current={active ? 'step' : undefined}
        className="group flex w-full items-start gap-4 rounded-card py-3 text-left"
      >
        <span
          data-tag
          className={clsx(
            'font-board relative z-10 mt-0.5 shrink-0 rounded-md px-2.5 py-1 text-lg leading-none transition-colors duration-200',
            active ? 'bg-kauri text-signal' : passed ? 'bg-fern text-white' : 'bg-mist text-ink-muted group-hover:bg-line',
          )}
        >
          GATE {step.step}
        </span>
        <span
          className={clsx(
            'pt-0.5 leading-snug transition-colors duration-200',
            active ? 'font-semibold text-ink' : passed ? 'text-ink' : 'text-ink-muted group-hover:text-ink',
          )}
        >
          {step.title}
        </span>
      </button>
    </li>
  )
}

function MobileGate({ step, active, passed, onSelect }: GateButtonProps) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        data-gate={step.step - 1}
        onClick={() => onSelect(step.step - 1)}
        aria-current={active ? 'step' : undefined}
        aria-label={`Gate ${step.step}: ${step.title}`}
        className={clsx(
          'font-board relative z-10 flex min-h-11 min-w-16 items-center justify-center rounded-md px-3 text-lg transition-colors duration-200',
          active ? 'bg-kauri text-signal' : passed ? 'bg-fern text-white' : 'bg-mist text-ink-muted',
        )}
      >
        GATE {step.step}
      </button>
    </li>
  )
}

/** Overhead airport sign for one step: gate tag, title in signage caps, direction arrow, pictogram. */
function SignPanel({ step, active, last }: { step: ProcessStep; active: boolean; last: boolean }) {
  const reduceMotion = useReducedMotion()
  const Arrow = last ? ArrowUpRight : ArrowRight
  return (
    <div className="on-dark flex items-center gap-4 rounded-card bg-kauri p-4 sm:gap-6 sm:p-6 lg:p-7"
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:gap-4">
        <m.span
          aria-hidden="true"
          initial={false}
          animate={active && !reduceMotion ? { rotateX: [-90, 0] } : { rotateX: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ transformPerspective: 500 }}
          className={clsx(
            'font-board rounded-md px-3 py-1 text-xl leading-none transition-colors duration-300 sm:text-2xl',
            active ? 'bg-signal text-kauri' : 'bg-kauri-2 text-signal',
          )}
        >
          GATE {step.step}
        </m.span>
        <div className="flex items-center gap-3 text-signal">
          <h2 id={`${stepId(step.step)}-title`} className="font-board text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.05] uppercase">
            <span className="sr-only">Gate {step.step}: </span>
            {step.title}
          </h2>
          <Arrow
            aria-hidden="true"
            className={clsx(
              'size-8 shrink-0 transition-transform duration-300 sm:size-10',
              active ? (last ? '-translate-y-1 translate-x-1' : 'translate-x-1') : 'translate-x-0',
            )}
            strokeWidth={2.25}
          />
        </div>
      </div>
      <div className="shrink-0 rounded-lg bg-paper p-1.5 sm:p-2.5">
        <Img name={step.image} alt="" className="block h-auto w-16 sm:w-28 lg:w-32" />
      </div>
    </div>
  )
}

type Geometry = { centers: number[]; trackW: number }

/** Fractional gate index (0..LAST) for a scroll progress, piecewise-linear between the measured anchors. */
function gateAt(progress: number, anchors: number[]): number {
  if (anchors.length < 2) return 0
  if (progress <= anchors[0]) return 0
  for (let i = 1; i < anchors.length; i++) {
    if (progress <= anchors[i]) {
      const span = anchors[i] - anchors[i - 1]
      return i - 1 + (span > 0 ? (progress - anchors[i - 1]) / span : 1)
    }
  }
  return LAST
}

/** Pixel y of a fractional gate index along the measured gate centres. */
function yAt(gate: number, centers: number[]): number {
  if (centers.length < 2) return 0
  const i = Math.min(LAST - 1, Math.max(0, Math.floor(gate)))
  return centers[i] + (centers[i + 1] - centers[i]) * (Math.min(LAST, Math.max(0, gate)) - i)
}

/** Five steps as a journey: scroll drives a plane down a sticky gate rail (desktop) or along the gate strip (mobile). */
export function ProcessJourney() {
  const [active, setActive] = useState(0)
  const [geom, setGeom] = useState<Geometry>({ centers: [], trackW: 0 })
  const reduceMotion = useReducedMotion()
  const mobileListRef = useRef<HTMLOListElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLOListElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  // Measured layout, read by motion transforms so scrolling never triggers React renders.
  const anchorsRef = useRef<number[]>([])
  const geomRef = useRef<Geometry>(geom)
  const lineRef = useRef(96)

  // Scroll progress of the steps column: 0 when its top reaches the viewport top, 1 when its bottom does.
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start start', 'end start'] })
  const gate = useTransform(scrollYProgress, (p) => gateAt(p, anchorsRef.current))
  const smooth = useSpring(gate, { stiffness: 130, damping: 28, mass: 0.6 })
  const reduceRef = useRef(false)
  useEffect(() => {
    reduceRef.current = !!reduceMotion
    gate.set(gate.get())
  }, [reduceMotion, gate])
  // One source of truth for plane, fill and highlighted gate.
  // Reduced motion: snap to whole gates instead of gliding. Read via a ref so the subscription stays stable.
  const shown: MotionValue<number> = useTransform(() => {
    const glide = smooth.get()
    const raw = gate.get()
    return reduceRef.current ? Math.min(LAST, Math.floor(raw + 0.05)) : glide
  })

  const planeY = useTransform(shown, (g) => yAt(g, geomRef.current.centers) - 16)
  const fillY = useTransform(shown, (g) => {
    const c = geomRef.current.centers
    return c.length < 2 ? 0 : (yAt(g, c) - c[0]) / (c[LAST] - c[0])
  })
  const planeX = useTransform(shown, (g) => (g / LAST) * Math.max(0, geomRef.current.trackW - 14))
  const fillX = useTransform(shown, (g) => {
    const w = geomRef.current.trackW
    return w ? ((g / LAST) * Math.max(0, w - 14) + 7) / w : 0
  })

  useMotionValueEvent(shown, 'change', (g) => setActive(Math.min(LAST, Math.max(0, Math.floor(g + 0.05)))))

  const measure = useCallback(() => {
    const container = stepsRef.current
    const rail = railRef.current
    if (!container) return
    const header = document.querySelector('header')
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    const headerBottom = header ? header.getBoundingClientRect().bottom : 0
    lineRef.current = Math.max(0, headerBottom) + (desktop ? 24 : (mobileNavRef.current?.offsetHeight ?? 56) + 12)

    const containerTop = container.getBoundingClientRect().top
    const height = container.offsetHeight || 1
    anchorsRef.current = processSteps.map((s, i) => {
      const el = document.getElementById(stepId(s.step))
      if (i === 0 || !el) return 0
      return (el.getBoundingClientRect().top - containerTop - lineRef.current) / height
    })

    const railTop = rail?.getBoundingClientRect().top ?? 0
    const centers = rail
      ? Array.from(rail.querySelectorAll<HTMLElement>('[data-tag]')).map((t) => {
          const r = t.getBoundingClientRect()
          return r.top - railTop + r.height / 2
        })
      : []
    const trackW = mobileTrackRef.current?.clientWidth ?? 0
    const prev = geomRef.current
    const same =
      prev.trackW === trackW &&
      prev.centers.length === centers.length &&
      prev.centers.every((c, i) => Math.abs(c - centers[i]) < 0.5)
    if (!same) {
      geomRef.current = { centers, trackW }
      setGeom(geomRef.current)
    }
    // Re-evaluate the motion values against fresh geometry.
    gate.set(gateAt(scrollYProgress.get(), anchorsRef.current))
  }, [gate, scrollYProgress])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    const container = stepsRef.current
    const ro = new ResizeObserver(measure)
    if (container) ro.observe(container)
    window.addEventListener('resize', measure)
    void document.fonts?.ready.then(measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  // Keep the active gate visible inside the horizontal strip, without moving the page.
  useEffect(() => {
    const list = mobileListRef.current
    const button = list?.querySelector<HTMLElement>(`[data-gate="${active}"]`)
    if (!list || !button) return
    list.scrollTo({ left: button.offsetLeft - list.clientWidth / 2 + button.offsetWidth / 2, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [active, reduceMotion])

  // Scroll so the step's top lands on the activation line; the plane then sits exactly at that gate.
  const select = (index: number) => {
    const el = document.getElementById(stepId(index + 1))
    if (!el) return
    measure()
    const top = el.getBoundingClientRect().top + window.scrollY - lineRef.current
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const { centers } = geom
  const ready = centers.length === processSteps.length
  const span = ready ? centers[LAST] - centers[0] : 0

  return (
    <section aria-label="The five steps" className="bg-paper">
      {/* Mobile gate strip, sticky under the header. */}
      <nav
        ref={mobileNavRef}
        aria-label="Process gates"
        className="sticky top-[var(--header-h)] z-20 border-b border-line bg-paper lg:hidden"
      >
        <ol ref={mobileListRef} className="flex gap-2 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] sm:px-8">
          {processSteps.map((step) => (
            <MobileGate
              key={step.step}
              step={step}
              active={active === step.step - 1}
              passed={active > step.step - 1}
              onSelect={select}
            />
          ))}
        </ol>
        <div ref={mobileTrackRef} aria-hidden="true" className="relative mx-5 h-2 sm:mx-8">
          <span className="absolute inset-x-0 top-[3px] h-0.5 bg-line" />
          <m.span className="absolute inset-x-0 top-[3px] h-0.5 origin-left bg-fern" style={{ scaleX: fillX }} />
          <m.div className="absolute -top-[3px] left-0 size-3.5 text-fern" style={{ x: planeX }}>
            <PlaneIcon className="size-3.5" />
          </m.div>
        </div>
      </nav>

      <Container className="grid gap-x-16 lg:grid-cols-12">
        <nav aria-label="Process gates" className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2.5rem)] py-14">
            <ol ref={railRef} className="relative">
              {ready && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute left-[11px] w-0.5 bg-line"
                    style={{ top: centers[0], height: span }}
                  />
                  <m.span
                    aria-hidden="true"
                    className="absolute left-[11px] w-0.5 origin-top bg-fern"
                    style={{ top: centers[0], height: span, scaleY: fillY }}
                  />
                </>
              )}
              {processSteps.map((step) => (
                <DesktopGate
                  key={step.step}
                  step={step}
                  active={active === step.step - 1}
                  passed={active >= step.step - 1}
                  onSelect={select}
                />
              ))}
              {ready && (
                <m.div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-[-4px] z-20 size-8 text-fern"
                  style={{ y: planeY }}
                >
                  <PlaneIcon className="size-8 rotate-90" />
                </m.div>
              )}
            </ol>
          </div>
        </nav>

        <div ref={stepsRef} className="lg:col-span-8">
          {processSteps.map((step) => (
            <article
              key={step.step}
              id={stepId(step.step)}
              aria-labelledby={`${stepId(step.step)}-title`}
              className="border-b border-line py-10 last:border-b-0 lg:py-14"
            >
              <SignPanel step={step} active={active === step.step - 1} last={step.step === processSteps.length} />
              <div className="mt-6 flex max-w-[62ch] flex-col gap-5 text-[1.0625rem] leading-[1.7]">
                {step.body.split('\n\n').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
