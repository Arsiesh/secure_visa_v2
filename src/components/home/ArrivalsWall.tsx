import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { arrivals } from '../../content/arrivals'
import { homeProof } from '../../content/home'
import { longTestimonials, perciQuote, testimonials } from '../../content/testimonials'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { Img } from '../Img'
import { StampDefs, StampPress, StampedName } from '../stories/PassportStamp'
import { useStampTile } from '../stories/useStampTile'
import { TestimonialRail, type RailItem } from '../TestimonialRail'

/** Varied sizes on purpose: a collage, not a grid. Spans are for a 6-column phone grid and a 12-column desktop grid. */
const WALL: { id: string; span: string }[] = [
  { id: 'raymundo-family', span: 'col-span-4 row-span-2 md:col-span-5' },
  { id: 'laguilles-family', span: 'col-span-2 row-span-2 md:col-span-4' },
  { id: 'grethel-fernando', span: 'col-span-3 md:col-span-3' },
  { id: 'anne-bien', span: 'col-span-3 md:col-span-3' },
  { id: 'christa-castor', span: 'col-span-2 row-span-2 md:col-span-3' },
  { id: 'archie-nanette', span: 'col-span-4 row-span-2 md:col-span-5' },
  { id: 'jessyka-sevilla', span: 'hidden row-span-2 md:block md:col-span-4' },
]
const byId = new Map(arrivals.map((a) => [a.id, a]))

const RAIL: RailItem[] = [
  { id: perciQuote.id, quote: perciQuote.quote, name: perciQuote.name, subtitle: perciQuote.from },
  ...testimonials
    .filter((t) => t.quote.length < 260)
    .map((t) => ({ id: t.id, quote: t.quote, name: t.name, photo: t.photo })),
]

const letter = longTestimonials.find((t) => t.id === 'abi-admin-staff')!

export function ArrivalsWall() {
  const stampRef = useStampTile()
  return (
    <section aria-labelledby="wall-title" className="bg-mist py-16 sm:py-20 lg:py-28">
      <Container>
        <h2 id="wall-title" className="font-display max-w-[26ch] text-[clamp(1.875rem,3.8vw,3.25rem)]">
          {homeProof.headingAlt}
        </h2>

        <StampDefs />
        <ul className="mt-10 grid auto-rows-[9rem] grid-flow-dense grid-cols-6 gap-2.5 sm:auto-rows-[11rem] md:grid-cols-12 md:auto-rows-[9.5rem] md:gap-3 lg:auto-rows-[11rem]">
          {WALL.map(({ id, span }) => {
            const a = byId.get(id)!
            return (
              <li key={id} ref={stampRef} className={clsx('relative overflow-hidden rounded-card bg-kauri-2', span)}>
                <StampPress>
                <Img
                  name={a.image}
                  alt={a.alt}
                  sizes="(min-width: 768px) 40vw, 70vw"
                  className="absolute inset-0 size-full object-cover object-[50%_30%]"
                />
                </StampPress>
                <StampedName id={id} name={a.name} truncate={false} pillClassName="px-3 py-1 text-[0.875rem] font-medium leading-snug" />
              </li>
            )
          })}
        </ul>

        <TestimonialRail className="mt-16" items={RAIL} label="Client testimonials" heading="In their words" />

        <figure className="mt-16 grid gap-x-12 gap-y-6 lg:grid-cols-12">
          <blockquote className="lg:col-span-8">
            <p className="font-display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight">“{letter.headline}”</p>
            <details className="group mt-6 max-w-[62ch]">
              <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-fern underline underline-offset-4 hover:text-fern-dark">
                Read the full letter
              </summary>
              <p className="mt-3 text-ink">{letter.body}</p>
            </details>
          </blockquote>
          <figcaption className="self-end text-ink-muted lg:col-span-4">{letter.attribution}</figcaption>
        </figure>

        <div className="mt-10">
          <ButtonLink href="/success-stories/" variant="secondary" icon={ArrowRight} iconPosition="end">
            Read more success stories
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
