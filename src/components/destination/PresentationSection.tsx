import { Check } from 'lucide-react'
import type { Destination } from '../../content/destinations'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { Img } from '../Img'
import type { DestinationVisuals } from './visuals'

type Props = { dest: Destination; visual: DestinationVisuals; className?: string }

export function PresentationSection({ dest, visual, className }: Props) {
  const { presentation } = dest
  const [intro, emphasis, ...rest] = presentation.closing
  const title = `${presentation.lead} ${presentation.heading.charAt(0).toLowerCase()}${presentation.heading.slice(1)}`
  return (
    <section aria-labelledby="presentation-heading" className={className}>
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-7">
          <h2 id="presentation-heading" className="font-display max-w-[18ch] text-[clamp(1.875rem,3.8vw,3.25rem)]">
            {title}
          </h2>
          <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.7]">{presentation.intro}</p>
          <ul className="mt-7 flex max-w-[62ch] flex-col gap-4">
            {presentation.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3.5 leading-snug">
                <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-fern text-white">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center lg:col-span-5">
          <Img
            name={visual.presentation.name}
            alt={visual.presentation.alt}
            className="mx-auto h-auto w-full max-w-md lg:max-w-none"
          />
        </div>
        <div className="lg:col-span-12">
          <div className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-16">
            <p className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.15] text-kauri lg:col-span-7">{emphasis}</p>
            <div className="flex max-w-[62ch] flex-col gap-5 leading-[1.7] lg:col-span-5">
              <p>{intro}</p>
              {rest.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <div>
                <ButtonLink href={presentation.cta.href}>{presentation.cta.label}</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
