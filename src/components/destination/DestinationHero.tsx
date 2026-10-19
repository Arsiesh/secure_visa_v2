import { CalendarCheck, Play } from 'lucide-react'
import type { Destination } from '../../content/destinations'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { imageMeta } from '../../content/imageMeta'
import { Img } from '../Img'
import type { DestinationVisuals } from './visuals'

type Props = { dest: Destination; visual: DestinationVisuals }

export function DestinationHero({ dest, visual }: Props) {
  const { hero } = dest
  const { crop } = visual.hero
  const meta = imageMeta[visual.hero.name]
  return (
    <section className="on-dark bg-kauri text-white">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="lg:col-span-7">
          <p className="font-board inline-flex items-center gap-2 rounded-md border border-signal/60 px-2.5 py-1 text-lg text-signal">
            <span className="sr-only">{visual.heroTag}</span>
            <span aria-hidden="true">{visual.route}</span>
          </p>
          <h1 className="font-display mt-5 max-w-[14ch] text-[clamp(2.5rem,6.4vw,5.25rem)]">{hero.title}</h1>
          <p className="mt-5 max-w-[34ch] text-[clamp(1.25rem,2.2vw,1.625rem)] font-medium leading-snug text-kawakawa">
            {hero.subtitle}
          </p>
          <p className="mt-6 max-w-[56ch] text-white/85">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {hero.ctas.map((cta, index) => (
              <ButtonLink
                key={cta.href + cta.label}
                href={cta.href}
                variant={index === 0 ? 'onDark' : 'ghost'}
                icon={/webinar/i.test(cta.label) ? CalendarCheck : Play}
              >
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div
            className="relative mx-auto w-full max-w-md overflow-hidden rounded-photo lg:max-w-none"
            style={{ aspectRatio: `${crop.w} / ${crop.h}` }}
          >
            <Img
              name={visual.hero.name}
              alt=""
              priority
              sizes="(min-width: 1024px) 700px, 90vw"
              className="absolute max-w-none"
              style={{
                width: `${(meta.w / crop.w) * 100}%`,
                left: `${(-crop.x / crop.w) * 100}%`,
                top: `${(-crop.y / crop.h) * 100}%`,
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
