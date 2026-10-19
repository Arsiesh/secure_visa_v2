import { longTestimonials, testimonials } from '../../content/testimonials'
import type { RailItem } from '../TestimonialRail'
import { TestimonialRail } from '../TestimonialRail'
import { Container } from '../Container'
import type { Destination } from '../../content/destinations'

const railItems: RailItem[] = testimonials.map((t) => ({
  id: t.id,
  quote: t.quote,
  name: t.name,
  subtitle: t.from,
  photo: t.photo,
}))

type Props = { slug: Destination['slug']; name: string; className?: string }

/** Full client letters for this destination, then the shorter reviews in a rail. */
export function LettersSection({ slug, name, className }: Props) {
  const letters = longTestimonials.filter((letter) => letter.destination === slug)
  return (
    <section aria-label={`Client words about ${name}`} className={className}>
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-14 lg:gap-20">
          {letters.map((letter) => (
            <figure key={letter.id} className="grid gap-6 lg:grid-cols-12 lg:gap-16">
              <blockquote className="lg:col-span-7">
                <p className="font-display text-[clamp(1.5rem,3vw,2.375rem)] leading-[1.12] text-kauri">
                  “{letter.headline}”
                </p>
              </blockquote>
              <div className="lg:col-span-5">
                <p className="max-w-[62ch] leading-[1.7] text-ink">{letter.body}</p>
                <figcaption className="mt-5 font-semibold text-ink">{letter.attribution}</figcaption>
              </div>
            </figure>
          ))}
        </div>
        <TestimonialRail
          items={railItems}
          label="Client testimonials"
          heading="We’ve helped hundreds of people start their migration and fulfill their dreams"
          className="mt-16 lg:mt-24"
        />
      </Container>
    </section>
  )
}
