import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { processIntro, processSteps } from '../../content/process'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'

/** One short line per step, trimmed from the full step copy on the process page. */
const SUMMARY: Record<number, { title: string; line: string }> = {
  1: { title: 'Student eligibility “Accelerator Assessment”', line: 'When you work with us, you become part of our family.' },
  2: { title: 'School registration', line: 'We help you find, apply, and register for your study program.' },
  3: { title: 'Student visa application', line: 'We set you up for a successful application, saving you time, money, and a lot of sleepless nights.' },
  4: { title: 'Finalizing your documents', line: 'An immigration lawyer or licensed adviser checks everything, with a mock interview before your big day.' },
  5: { title: 'Lodgement', line: 'You sign off on and submit your forms with an experienced specialist beside you.' },
}

export function ProcessPreview() {
  return (
    <section aria-labelledby="process-title" className="bg-paper py-16 sm:py-20 lg:py-28">
      <Container>
        <h2 id="process-title" className="font-display max-w-[20ch] text-[clamp(1.875rem,3.8vw,3.25rem)]">
          The proven process
        </h2>
        <p className="mt-4 max-w-[56ch] text-ink-muted">
          {processIntro.title}, {processIntro.body}
        </p>

        <ol className="relative mt-12 flex flex-col gap-9 lg:grid lg:grid-cols-5 lg:gap-6">
          {/* Route line: vertical on phones, horizontal from lg. */}
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-[1.375rem] top-5 w-0 border-l-2 border-dashed border-fern/50 lg:bottom-auto lg:left-5 lg:right-5 lg:top-[1.375rem] lg:h-0 lg:w-auto lg:border-l-0 lg:border-t-2"
          />
          {processSteps.map((s) => (
            <li key={s.step} className="relative flex gap-5 lg:flex-col lg:gap-5">
              <span className="font-board relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-[0.625rem] bg-kauri text-[1.75rem] leading-none text-signal">
                {s.step}
              </span>
              <div>
                <h3 className="text-[1.1875rem] font-semibold leading-snug">{SUMMARY[s.step].title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-[1rem] text-ink-muted">{SUMMARY[s.step].line}</p>
                {s.step === 1 ? (
                  <Link
                    to="/connect/?intent=assessment"
                    className="mt-1 inline-flex min-h-11 items-center font-semibold text-fern underline underline-offset-4 hover:text-kauri"
                  >
                    Book your free assessment
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <ButtonLink href="/process/" variant="secondary" icon={ArrowRight} iconPosition="end">
            See the whole process
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
