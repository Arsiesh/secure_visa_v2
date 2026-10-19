import { CalendarCheck, Play } from 'lucide-react'
import type { Destination } from '../../content/destinations'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { Img } from '../Img'
import type { DestinationVisuals } from './visuals'

type Props = { dest: Destination; visual: DestinationVisuals }

export function RemainSection({ dest, visual }: Props) {
  const { remain } = dest
  return (
    <section aria-labelledby="remain-heading" className="bg-paper py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
          <div className="aspect-[4/5] overflow-hidden rounded-photo bg-kauri ring-1 ring-line">
            <Img
              name={visual.remain.name}
              alt={visual.remain.alt}
              className={`size-full object-cover ${visual.remain.className ?? ''}`}
            />
          </div>
        </div>
        <div className="lg:col-span-8">
          <h2 id="remain-heading" className="font-display max-w-[22ch] text-[clamp(1.875rem,3.8vw,3.25rem)]">
            {remain.heading}
          </h2>
          <div className="mt-6 flex max-w-[60ch] flex-col gap-5 text-[1.0625rem] leading-[1.7]">
            {remain.body.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href={remain.cta.href} icon={/webinar/i.test(remain.cta.label) ? CalendarCheck : Play}>
              {remain.cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
