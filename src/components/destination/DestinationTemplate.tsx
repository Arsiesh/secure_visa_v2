import { Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Destination } from '../../content/destinations'
import { CtaBand } from '../CtaBand'
import { Container } from '../Container'
import { FlightProgress } from '../FlightProgress'
import { ArrivalsStrip } from './ArrivalsStrip'
import { DestinationHero } from './DestinationHero'
import { LettersSection } from './LettersSection'
import { PresentationSection } from './PresentationSection'
import { PromiseRoute } from './PromiseRoute'
import { RemainSection } from './RemainSection'
import { StorySection } from './StorySection'
import { visuals } from './visuals'

type Props = { dest: Destination; description: string }

/** One template for both destinations, so the pages stay consistent. Copy comes from destinations.ts, photography from visuals.ts. */
export function DestinationTemplate({ dest, description }: Props) {
  const visual = visuals[dest.slug]
  const hasArrivals = Boolean(visual.arrivals)
  return (
    <>
      <title>{`Emigrate to ${dest.name} | Secure Visa`}</title>
      <meta name="description" content={description} />
      <FlightProgress to={dest.airport} />
      <DestinationHero dest={dest} visual={visual} />
      <StorySection dest={dest} visual={visual} />
      <PromiseRoute dest={dest} visual={visual} />
      <RemainSection dest={dest} visual={visual} />
      {visual.arrivals ? <ArrivalsStrip photos={visual.arrivals} className="bg-mist" /> : null}
      <PresentationSection dest={dest} visual={visual} className={hasArrivals ? 'bg-paper' : 'bg-mist'} />
      <LettersSection slug={dest.slug} name={dest.name} className={hasArrivals ? 'bg-mist' : 'bg-paper'} />
      <section aria-label="Our process" className={hasArrivals ? 'bg-paper' : 'bg-mist'}>
        <Container className="flex flex-col items-start gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[48ch] text-lg font-medium text-ink">
            Want to see how the journey works, step by step? Walk through our five-step process.
          </p>
          <Link
            to="/process/"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-fern px-6 py-2.5 font-semibold text-fern transition-colors hover:bg-fern hover:text-white"
          >
            <Route aria-hidden="true" className="size-5" />
            See our process
          </Link>
        </Container>
      </section>
      <CtaBand label={dest.finalCta.label} href={dest.finalCta.href} />
    </>
  )
}
