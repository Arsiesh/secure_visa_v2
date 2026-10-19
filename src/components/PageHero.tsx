import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Container } from './Container'
import { Img } from './Img'

type PageHeroProps = {
  /** Rendered as the page's single h1, in the expanded display face. */
  title: string
  /** One short paragraph, or a few. Keep it to about 68 characters per line. */
  intro?: ReactNode
  /** Right-hand photo. It loads with high priority because it sits above the fold. */
  image?: { name: string; alt: string; className?: string }
  /** Extra content under the intro. */
  children?: ReactNode
}

/** Hero pattern for inner pages: kauri background, display title, intro, optional photo and calls to action. */
export function PageHero({ title, intro, image, children }: PageHeroProps) {
  return (
    <section className="on-dark overflow-hidden bg-kauri text-white">
      <Container className={clsx('grid items-center gap-10 py-14 lg:gap-16 lg:py-24', image && 'lg:grid-cols-12')}>
        <div className={clsx(image && 'lg:col-span-7')}>
          <h1 className="font-display max-w-[18ch] text-[clamp(2.25rem,6vw,4.5rem)]">{title}</h1>
          {intro ? (
            <div className="mt-6 flex max-w-[60ch] flex-col gap-4 text-[1.0625rem] text-white/85 sm:text-lg">{intro}</div>
          ) : null}
          {children}
        </div>
        {image ? (
          <div className="lg:col-span-5">
            <Img
              name={image.name}
              alt={image.alt}
              priority
              className={clsx('aspect-[4/5] w-full rounded-photo object-cover object-top', image.className)}
            />
          </div>
        ) : null}
      </Container>
    </section>
  )
}
