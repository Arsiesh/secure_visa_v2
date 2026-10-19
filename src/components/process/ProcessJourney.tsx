import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import clsx from 'clsx'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { processSteps, type ProcessStep } from '../../content/process'
import { Container } from '../Container'
import { Img } from '../Img'

const stepId = (step: number) => `gate-${step}`

type GateButtonProps = {
  step: ProcessStep
  active: boolean
  onSelect: (index: number) => void
}

function DesktopGate({ step, active, onSelect }: GateButtonProps) {
  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => onSelect(step.step - 1)}
        aria-current={active ? 'step' : undefined}
        className="group flex w-full items-start gap-4 rounded-card py-3 text-left"
      >
        <span
          className={clsx(
            'font-board relative z-10 mt-0.5 shrink-0 rounded-md px-2.5 py-1 text-lg leading-none transition-colors duration-200',
            active ? 'bg-kauri text-signal' : 'bg-mist text-ink-muted group-hover:bg-line',
          )}
        >
          GATE {step.step}
        </span>
        <span
          className={clsx(
            'pt-0.5 leading-snug transition-colors duration-200',
            active ? 'font-semibold text-ink' : 'text-ink-muted group-hover:text-ink',
          )}
        >
          {step.title}
        </span>
      </button>
    </li>
  )
}

function MobileGate({ step, active, onSelect }: GateButtonProps) {
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
          active ? 'bg-kauri text-signal' : 'bg-mist text-ink-muted',
        )}
      >
        GATE {step.step}
      </button>
    </li>
  )
}

/** Overhead airport sign for one step: gate tag, title in signage caps, direction arrow, pictogram. */
function SignPanel({ step, active, last }: { step: ProcessStep; active: boolean; last: boolean }) {
  const Arrow = last ? ArrowUpRight : ArrowRight
  return (
    <div className="on-dark flex items-center gap-4 rounded-card bg-kauri p-4 sm:gap-6 sm:p-6 lg:p-7"
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:gap-4">
        <span
          aria-hidden="true"
          className={clsx(
            'font-board rounded-md px-3 py-1 text-xl leading-none transition-colors duration-300 sm:text-2xl',
            active ? 'bg-signal text-kauri' : 'bg-kauri-2 text-signal',
          )}
        >
          GATE {step.step}
        </span>
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
        <Img name={step.image} alt="" sizes="144px" className="block h-auto w-16 sm:w-28 lg:w-32" />
      </div>
    </div>
  )
}

/** Five steps as a journey: a sticky route rail (desktop) or gate strip (mobile) that follows the scroll. */
export function ProcessJourney() {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const mobileListRef = useRef<HTMLOListElement>(null)
  // Clicking a gate scrolls smoothly; the observer must not fight it with intermediate steps.
  const lockedTo = useRef<number | null>(null)
  const lockTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(lockTimer.current), [])

  useEffect(() => {
    const sections = processSteps.map((s) => document.getElementById(stepId(s.step)))
    const observer = new IntersectionObserver(
      () => {
        // Derive the current gate from layout: the last step whose top has passed 40% of the viewport.
        let index = 0
        sections.forEach((el, i) => {
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) index = i
        })
        if (lockedTo.current !== null) {
          if (index !== lockedTo.current) return
          lockedTo.current = null
        }
        setActive(index)
      },
      // Fires whenever a step edge crosses the 40% line (a thin band around it).
      { rootMargin: '-39% 0px -60% 0px' },
    )
    for (const el of sections) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Keep the active gate visible inside the horizontal strip, without moving the page.
  useEffect(() => {
    const list = mobileListRef.current
    const button = list?.querySelector<HTMLElement>(`[data-gate="${active}"]`)
    if (!list || !button) return
    list.scrollTo({ left: button.offsetLeft - list.clientWidth / 2 + button.offsetWidth / 2, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [active, reduceMotion])

  const select = (index: number) => {
    setActive(index)
    lockedTo.current = index
    document.getElementById(stepId(index + 1))?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    // Release the lock if the target is already in view and the observer never fires for it.
    window.clearTimeout(lockTimer.current)
    lockTimer.current = window.setTimeout(() => {
      if (lockedTo.current === index) lockedTo.current = null
    }, 1200)
  }

  const progress = active / (processSteps.length - 1)

  return (
    <section aria-label="The five steps" className="bg-paper">
      {/* Mobile gate strip, sticky under the header. */}
      <nav
        aria-label="Process gates"
        className="sticky top-[var(--header-h)] z-20 border-b border-line bg-paper lg:hidden"
      >
        <ol ref={mobileListRef} className="flex gap-2 overflow-x-auto px-5 py-2.5 [scrollbar-width:none] sm:px-8">
          {processSteps.map((step) => (
            <MobileGate key={step.step} step={step} active={active === step.step - 1} onSelect={select} />
          ))}
        </ol>
      </nav>

      <Container className="grid gap-x-16 lg:grid-cols-12">
        <nav aria-label="Process gates" className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-[calc(var(--header-h)+2.5rem)] py-14">
            <ol className="relative">
              <span aria-hidden="true" className="absolute top-6 bottom-6 left-[1.75rem] w-0.5 bg-line" />
              <span
                aria-hidden="true"
                className="absolute top-6 bottom-6 left-[1.75rem] w-0.5 origin-top bg-fern transition-transform duration-500 ease-out"
                style={{ transform: `scaleY(${progress})` }}
              />
              {processSteps.map((step) => (
                <DesktopGate key={step.step} step={step} active={active === step.step - 1} onSelect={select} />
              ))}
            </ol>
          </div>
        </nav>

        <div className="lg:col-span-8">
          {processSteps.map((step) => (
            <article
              key={step.step}
              id={stepId(step.step)}
              aria-labelledby={`${stepId(step.step)}-title`}
              className="scroll-mt-7 border-b border-line py-10 last:border-b-0 lg:scroll-mt-24 lg:py-14"
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
