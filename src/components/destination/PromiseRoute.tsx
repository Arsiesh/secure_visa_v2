import type { Destination } from '../../content/destinations'
import { Container } from '../Container'
import { Img } from '../Img'
import type { DestinationVisuals } from './visuals'

type Props = { dest: Destination; visual: DestinationVisuals }

/** The four promises are a sequence (decide, prepare, submit, settle), so they hang off one connected route line. */
export function PromiseRoute({ dest, visual }: Props) {
  const { promise } = dest
  return (
    <section aria-labelledby="promise-heading" className="bg-mist py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 id="promise-heading" className="font-display max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.25rem)]">
            {promise.heading}
          </h2>
          <p className="mt-6 max-w-[52ch] text-xl font-medium leading-snug text-kauri">{promise.lead}</p>
          <ol className="mt-10 max-w-[56ch]">
            {promise.items.map((item, index) => {
              const last = index === promise.items.length - 1
              return (
                <li key={item} className="relative flex gap-5 pb-9 last:pb-0">
                  {last ? null : (
                    <span aria-hidden="true" className="absolute top-12 bottom-0 left-[1.375rem] w-0.5 -translate-x-1/2 bg-fern/40" />
                  )}
                  <span
                    aria-hidden="true"
                    className="font-board relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-kauri text-xl text-signal"
                  >
                    {index + 1}
                  </span>
                  <p className="pt-2 text-[1.1875rem] leading-snug text-pretty text-ink">{item}</p>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="lg:col-span-5">
          <div className="aspect-[5/4] overflow-hidden rounded-photo bg-kauri lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Img
              name={visual.promise.name}
              alt={visual.promise.alt}
              className="size-full origin-center scale-[1.22] object-cover object-[50%_45%]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
