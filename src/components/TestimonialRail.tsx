import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import clsx from 'clsx'
import { Img } from './Img'

export type RailItem = {
  id: string
  quote: string
  name: string
  /** Optional line under the name, for example "Philippines". */
  subtitle?: string
  /** Avatar filename in /images/. */
  photo?: string
}

type TestimonialRailProps = {
  items: readonly RailItem[]
  /** Accessible name for the carousel, for example "Client testimonials". */
  label: string
  /** Visible heading. Rendered as an h2 with this id-linked label. */
  heading?: string
  tone?: 'light' | 'dark'
  className?: string
}

/** Horizontal scroll-snap rail. No autoplay: it only moves on swipe, wheel, arrow keys, or the prev/next buttons. */
export function TestimonialRail({ items, label, heading, tone = 'light', className }: TestimonialRailProps) {
  const dark = tone === 'dark'
  const scrollerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const headingId = useId()
  const [edge, setEdge] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const start = el.scrollLeft <= 4
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [measure])

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-slide]')
    const step = (card?.offsetWidth ?? el.clientWidth * 0.8) + 16
    el.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      event.currentTarget.scrollTo({ left: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    } else if (event.key === 'End') {
      event.preventDefault()
      event.currentTarget.scrollTo({ left: event.currentTarget.scrollWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }

  const navButton = clsx(
    'inline-flex size-12 items-center justify-center rounded-full border-2 transition-colors disabled:cursor-not-allowed disabled:opacity-35',
    dark
      ? 'border-white/60 text-white hover:bg-white/10 disabled:hover:bg-transparent'
      : 'border-fern text-fern hover:bg-fern hover:text-white disabled:hover:bg-transparent disabled:hover:text-fern',
  )

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={clsx(dark && 'on-dark', className)}
    >
      <div className="mb-6 flex items-end justify-between gap-6">
        {heading ? (
          <h2 id={headingId} className={clsx('font-display text-[clamp(1.75rem,3.4vw,2.75rem)]', dark ? 'text-white' : 'text-ink')}>
            {heading}
          </h2>
        ) : (
          <span />
        )}
        <div className="flex shrink-0 gap-2">
          <button type="button" className={navButton} disabled={edge.start} onClick={() => scrollByCard(-1)}>
            <ChevronLeft aria-hidden="true" className="size-6" />
            <span className="sr-only">Previous testimonials</span>
          </button>
          <button type="button" className={navButton} disabled={edge.end} onClick={() => scrollByCard(1)}>
            <ChevronRight aria-hidden="true" className="size-6" />
            <span className="sr-only">Next testimonials</span>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        tabIndex={0}
        role="group"
        aria-label={`${label}, scrollable. Use the left and right arrow keys.`}
        onKeyDown={onKeyDown}
        className="-mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-px-5 px-5 pb-3 [scrollbar-width:thin] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
      >
        {items.map((item, index) => (
          <figure
            key={item.id}
            data-slide
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            className={clsx(
              'flex w-[min(84vw,23rem)] shrink-0 snap-start flex-col justify-between gap-6 rounded-card p-6 sm:p-7',
              dark ? 'bg-kauri-2 text-white' : 'bg-mist text-ink',
            )}
          >
            <blockquote className="flex flex-col gap-4">
              <Quote aria-hidden="true" className={clsx('size-7', dark ? 'text-kawakawa' : 'text-fern')} />
              <p className="text-[1.0625rem] leading-relaxed">{item.quote}</p>
            </blockquote>
            <figcaption className="flex items-center gap-3">
              {item.photo ? (
                <Img name={item.photo} alt="" className="size-10 shrink-0 rounded-full object-cover" />
              ) : null}
              <span className="leading-snug">
                <span className="block font-semibold">{item.name}</span>
                {item.subtitle ? (
                  <span className={clsx('block text-[0.9375rem]', dark ? 'text-white/75' : 'text-ink-muted')}>
                    {item.subtitle}
                  </span>
                ) : null}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
