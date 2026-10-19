import type { Destination } from '../../content/destinations'
import { Container } from '../Container'
import { Img } from '../Img'
import type { DestinationVisuals } from './visuals'

type Props = { dest: Destination; visual: DestinationVisuals }

/** The founders' story as one comfortable reading column, with the strongest line pulled out. */
export function StorySection({ dest, visual }: Props) {
  const [opener, worry, third, landed, ...after] = dest.intro
  const before = [third]
  const photo = visual.story
  return (
    <section aria-labelledby="story-heading" className="bg-paper py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 id="story-heading" className="font-display max-w-[30ch] text-[clamp(1.5rem,2.6vw,2.125rem)]">
            {opener}
          </h2>
          <div className="mt-8 flex max-w-[62ch] flex-col gap-6 text-[1.0625rem] leading-[1.7] text-ink">
            <p className="text-xl font-medium leading-snug">{worry}</p>
            {before.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <blockquote className="my-10 max-w-[34rem] border-l-4 border-fern pl-6 sm:pl-8">
            <p className="font-display text-[clamp(1.875rem,4.2vw,3.25rem)] text-kauri">{landed}</p>
          </blockquote>
          <div className="flex max-w-[62ch] flex-col gap-6 text-[1.0625rem] leading-[1.7] text-ink">
            {after.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <figure className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Img
              name={photo.name}
              alt={photo.alt}
              sizes="(min-width: 1024px) 480px, 90vw"
              className={`aspect-[4/5] w-full rounded-photo object-cover ${photo.className ?? ''}`}
            />
            {photo.caption ? <figcaption className="mt-3 text-[0.9375rem] text-ink-muted">{photo.caption}</figcaption> : null}
          </div>
        </figure>
      </Container>
    </section>
  )
}
