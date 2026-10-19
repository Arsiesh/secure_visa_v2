import { foundersIntro } from '../../content/founders'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { Img } from '../Img'

const [p1, p2, p3, p4] = foundersIntro.homeBody
/** Same text, split around the big figure so it can be set large inside one paragraph. */
const [p2Lead, p2Figure, p2Rest] = p2.split(/(Php 500,000!)/)

export function FoundersStory() {
  return (
    <section aria-labelledby="founders-title" className="bg-paper py-16 sm:py-20 lg:py-28">
      <Container className="grid items-start gap-x-16 gap-y-6 lg:grid-cols-12">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-5">
          {/* The cut-out fades to white, so it sits on paper with no rectangle edge. Cropped to the family, clear of the teal blob. */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_84%,transparent),linear-gradient(to_bottom,#000_86%,transparent)] sm:max-w-md lg:max-w-none">
            <Img
              name="home-hero-background.webp"
              alt="Jan and Aina with their daughter"
              sizes="(min-width: 1024px) 800px, 90vw"
              className="absolute left-[-57.5%] top-[-13.3%] w-[170%] max-w-none"
            />
          </div>
        </div>
        <div className="lg:col-span-7">
          <h2 id="founders-title" className="font-display max-w-[22ch] text-[clamp(1.875rem,3.8vw,3.25rem)]">
            {foundersIntro.homeHeading}
          </h2>
          <div className="mt-7 flex max-w-[60ch] flex-col gap-4">
            <p>{p1}</p>
            <p>
              <span className="font-semibold">{p2Lead}</span>
              <span className="font-display mb-2 mt-1 block whitespace-nowrap text-[clamp(2.25rem,5vw,4.25rem)] leading-none text-fern">{p2Figure}</span>
              {p2Rest}
            </p>
            <p>{p3}</p>
            <p>{p4}</p>
          </div>
          <div className="mt-8">
            <ButtonLink href={foundersIntro.homeCta.href} variant="secondary">
              Read our origin story
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
