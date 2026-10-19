import { partners } from '../../content/site'
import { Container } from '../Container'
import { FeaturedIn } from '../FeaturedIn'
import { Img } from '../Img'

export function TrustSection() {
  return (
    <>
      <section aria-labelledby="trust-title" className="bg-mist py-16 sm:py-20 lg:py-28">
        <Container>
          <div>
            <h2 id="trust-title" className="font-display text-[clamp(1.875rem,3.8vw,3.25rem)]">{partners.heading}</h2>
            <p className="mt-4 max-w-[68ch] text-ink-muted">{partners.text}</p>
            <div
              role="region"
              tabIndex={0}
              aria-label="Partner school logos. Scroll sideways to see more."
              className="mt-8 flex snap-x snap-proximity overflow-x-auto rounded-card bg-white py-4 [mask-image:linear-gradient(to_right,transparent,#000_3rem,#000_calc(100%-3rem),transparent)] [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]"
            >
              {partners.stripTiles.map((tile) => (
                <Img
                  key={tile}
                  name={tile}
                  alt=""
                  sizes="3400px"
                  className="h-20 w-auto max-w-none [filter:contrast(1.3)_saturate(1.15)] sm:h-28 shrink-0 snap-start"
                />
              ))}
            </div>
            <p className="mt-3 text-[0.9375rem] text-ink-muted">
              Logos of partner institutions. {partners.programs} {partners.programsLabel} across New Zealand, Canada and Australia.
            </p>
          </div>
        </Container>
      </section>
      <FeaturedIn tone="light" />
    </>
  )
}
