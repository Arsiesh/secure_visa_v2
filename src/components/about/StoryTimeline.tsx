import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll } from 'motion/react'
import clsx from 'clsx'
import { founderChapters, foundersIntro, type FounderChapter } from '../../content/founders'
import { Container } from '../Container'
import { Img } from '../Img'

/** Pull quotes: used twice in the whole story. `replaces` swaps a body paragraph, so the line is never repeated. */
const PULL_QUOTES: Record<string, { text: string; replaces?: number }> = {
  'the-scam': { text: foundersIntro.homeBody[1] },
  residency: { text: 'With Jan’s help, she gets 64 clients — and the promotion!', replaces: 4 },
}

/** Alt text for the images in the chapters. The originals carry none. */
const IMAGE_ALT: Record<string, string> = {
  'the-scam': 'A red “Application denied” stamp',
  'a-miracle': 'A pushpin on a map of New Zealand',
  'new-zealand': 'Jan, Aina and their daughter Amara in a black and white photo by the water',
  residency: 'Jan, Aina and Amara by the harbour, and a smiling portrait of Aina',
  founding: 'Jan, Aina and Amara in front of Auckland’s Sky Tower',
  today: 'Jan and Aina lifting their daughter Amara into the air by the harbour',
}

type ChapterProps = { chapter: FounderChapter; flip: boolean }

function Chapter({ chapter, flip }: ChapterProps) {
  const pull = PULL_QUOTES[chapter.id]
  return (
    <li id={chapter.id} className="relative scroll-mt-36 pb-16 pl-10 last:pb-0 sm:pl-14 lg:pb-24 lg:pl-20">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 grid size-[1.625rem] -translate-x-1/2 place-items-center rounded-full border-[3px] border-fern bg-paper"
      >
        <span className="size-2 rounded-full bg-fern" />
      </span>
      <div className={clsx('grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14', flip && 'lg:[&>*:first-child]:order-2')}>
        <div className={clsx(chapter.image ? 'lg:col-span-7' : 'lg:col-span-9')}>
          <p className="font-board inline-block rounded-sm bg-kauri px-2.5 py-1 text-base text-signal">
            {chapter.when}
          </p>
          <h3 className="font-display mt-4 max-w-[22ch] text-[clamp(1.5rem,3.4vw,2.5rem)]">{chapter.title}</h3>
          <div className="mt-5 flex max-w-[62ch] flex-col gap-4 text-pretty">
            {chapter.body.map((paragraph, index) =>
              pull?.replaces === index ? (
                <blockquote
                  key={paragraph}
                  className="font-display my-2 border-l-4 border-fern py-1 pl-5 text-[clamp(1.375rem,3vw,2rem)] text-fern-dark"
                >
                  {paragraph}
                </blockquote>
              ) : (
                <p key={paragraph}>{paragraph}</p>
              ),
            )}
            {pull && pull.replaces === undefined ? (
              <blockquote className="font-display my-2 border-l-4 border-fern py-1 pl-5 text-[clamp(1.25rem,2.6vw,1.75rem)] leading-tight text-fern-dark">
                {pull.text}
              </blockquote>
            ) : null}
          </div>
        </div>
        {chapter.image ? (
          <div className="lg:col-span-5">
            <Img
              name={chapter.image.src}
              alt={IMAGE_ALT[chapter.id] ?? chapter.image.alt}
              sizes="(min-width: 1024px) 420px, 80vw"
              className="mx-auto h-auto w-full max-w-sm"
            />
          </div>
        ) : null}
      </div>
    </li>
  )
}

/** The origin story as a route: dated stops along a line that fills while the reader scrolls. */
export function StoryTimeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const chipsRef = useRef<HTMLUListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] })
  const [activeId, setActiveId] = useState<string | null>(founderChapters[0].id)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    list.querySelectorAll('li[id]').forEach((item) => observer.observe(item))
    // Outside the timeline altogether: clear the highlight instead of leaving a stale chapter.
    const whole = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActiveId(null)
    }, { rootMargin: '-40% 0px -50% 0px' })
    whole.observe(list)
    return () => {
      observer.disconnect()
      whole.disconnect()
    }
  }, [])

  // Keep the active chip visible inside the horizontal strip, without moving the page.
  useEffect(() => {
    const list = chipsRef.current
    const chip = activeId ? list?.querySelector<HTMLElement>(`[data-chip="${activeId}"]`) : null
    if (!list || !chip) return
    const target = chip.parentElement ?? chip
    list.scrollTo({
      left: target.offsetLeft - list.clientWidth / 2 + target.offsetWidth / 2,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [activeId, reduce])

  return (
    <section aria-labelledby="story-heading" className="bg-paper">
      <h2 id="story-heading" className="sr-only">
        The story, chapter by chapter
      </h2>
      <nav
        aria-label="Story chapters"
        className="sticky top-[var(--header-h)] z-20 border-y border-line bg-paper/95 backdrop-blur"
      >
        <Container>
          <ul ref={chipsRef} className="-mx-2 flex gap-1 overflow-x-auto px-2 py-2 [scrollbar-width:none]">
            {founderChapters.map((chapter) => (
              <li key={chapter.id} className="shrink-0">
                <a
                  href={`#${chapter.id}`}
                  data-chip={chapter.id}
                  aria-current={activeId === chapter.id ? 'location' : undefined}
                  className={clsx(
                    'flex min-h-11 items-center rounded-full px-3.5 text-base font-medium transition-colors',
                    activeId === chapter.id ? 'bg-kauri text-signal' : 'text-ink-muted hover:bg-mist',
                  )}
                >
                  {chapter.when}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
      <Container className="py-14 lg:py-24">
        <div className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-3 w-[3px] -translate-x-1/2 bg-line">
            {reduce ? null : (
              <m.div className="size-full origin-top bg-fern" style={{ scaleY: scrollYProgress }} />
            )}
          </div>
          <ol ref={listRef}>
            {founderChapters.map((chapter, index) => (
              <Chapter key={chapter.id} chapter={chapter} flip={index % 2 === 1} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
