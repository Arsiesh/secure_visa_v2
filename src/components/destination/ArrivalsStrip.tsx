import { Container } from '../Container'
import { Img } from '../Img'
import type { DestinationVisuals } from './visuals'

type Props = { photos: NonNullable<DestinationVisuals['arrivals']>; className?: string }

/** Real arrival-hall photos. The staggered offsets are deliberate: it reads as a wall of snapshots, not a card grid. */
export function ArrivalsStrip({ photos, className }: Props) {
  return (
    <section aria-labelledby="arrivals-heading" className={className}>
      <Container className="py-16 lg:py-24">
        <h2 id="arrivals-heading" className="font-display max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.75rem)]">
          Families we’ve welcomed at Auckland Airport
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {photos.map((photo, index) => (
            <li key={photo.name} className={index === 1 ? 'md:mt-10' : index === 2 ? 'col-span-2 md:col-span-1 md:mt-20' : ''}>
              <figure>
                <Img
                  name={photo.name}
                  alt={photo.alt}
                  sizes="(min-width: 768px) 360px, 45vw"
                  className={`aspect-[4/5] w-full rounded-photo object-cover ${photo.className ?? ''}`}
                />
                <figcaption className="mt-2 text-[0.9375rem] text-ink-muted">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
