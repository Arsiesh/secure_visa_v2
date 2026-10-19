import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Plane } from 'lucide-react'
import clsx from 'clsx'
import { supportIntro, supportPhases, type SupportPhase } from '../../content/process'
import { Container } from '../Container'

// Plain-language names for the three moments, shown under each stop on the timeline.
const moments: Record<SupportPhase['id'], string> = {
  pre: 'Before you fly',
  during: 'Landing',
  post: 'After you settle',
}

/** Pre / During / Post as a segmented control that is also a three-stop timeline. */
export function SupportTabs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const phase = supportPhases[activeIndex]
  const last = supportPhases.length - 1

  const focusTab = (index: number) => {
    setActiveIndex(index)
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = supportPhases.length
    if (event.key === 'ArrowRight') focusTab((activeIndex + 1) % count)
    else if (event.key === 'ArrowLeft') focusTab((activeIndex - 1 + count) % count)
    else if (event.key === 'Home') focusTab(0)
    else if (event.key === 'End') focusTab(count - 1)
    else return
    event.preventDefault()
  }

  return (
    <section aria-labelledby="support-heading" className="bg-mist py-16 lg:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <h2 id="support-heading" className="font-display max-w-[16ch] text-[clamp(1.875rem,4vw,3.25rem)] lg:col-span-6">
            {supportIntro.title}
          </h2>
          <p className="max-w-[52ch] text-lg leading-relaxed text-ink-muted lg:col-span-6 lg:pt-2">
            {supportIntro.body.charAt(0).toUpperCase() + supportIntro.body.slice(1)}.
          </p>
        </div>

        <div className="mt-12 max-w-4xl">
          {/* Timeline: the line fills as you move from before to after; the plane rides on it. */}
          <div role="tablist" aria-label="When we support you" className="relative grid grid-cols-3">
            <span aria-hidden="true" className="absolute top-[1.375rem] right-[16.667%] left-[16.667%] h-0.5 bg-line" />
            <span
              aria-hidden="true"
              className="absolute top-[1.375rem] left-[16.667%] h-0.5 w-[66.666%] origin-left bg-fern transition-transform duration-500 ease-out"
              style={{ transform: `scaleX(${activeIndex / last})` }}
            />
            {supportPhases.map((item, index) => {
              const selected = index === activeIndex
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[index] = el
                  }}
                  type="button"
                  role="tab"
                  id={`support-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="support-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={onKeyDown}
                  className="group relative flex flex-col items-center gap-2 px-1 pb-1 text-center"
                >
                  <span
                    className={clsx(
                      'relative z-10 flex size-11 items-center justify-center rounded-full border-2 transition-colors duration-300',
                      selected ? 'border-kauri bg-kauri text-signal' : index < activeIndex ? 'border-fern bg-fern text-white' : 'border-line bg-paper text-ink-muted group-hover:border-fern',
                    )}
                  >
                    {selected ? <Plane aria-hidden="true" className="size-5" /> : <span aria-hidden="true" className="size-2.5 rounded-full bg-current" />}
                  </span>
                  <span className={clsx('font-display text-xl transition-colors duration-200', selected ? 'text-kauri' : 'text-ink-muted group-hover:text-ink')}>
                    {item.title}
                  </span>
                  <span className="text-[0.9375rem] text-ink-muted">{moments[item.id]}</span>
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id="support-panel"
            aria-labelledby={`support-tab-${phase.id}`}
            tabIndex={0}
            className="mt-8 min-h-48 rounded-card bg-paper p-6 sm:p-9"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={phase.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.18 }}
                className="max-w-[62ch] text-[1.1875rem] leading-[1.7]"
              >
                {phase.body}
              </m.p>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
