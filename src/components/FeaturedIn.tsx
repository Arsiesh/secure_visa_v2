import clsx from 'clsx'
import { featuredIn } from '../content/site'
import { Container } from './Container'
import { Img } from './Img'

type FeaturedInProps = {
  /** The logos are pale grey, so each tone darkens or lightens them to stay readable. */
  tone?: 'light' | 'dark'
  className?: string
}

/** "Featured in" press strip. A narrow stacked version shows on phones and the single-line version from md up. */
export function FeaturedIn({ tone = 'light', className }: FeaturedInProps) {
  const dark = tone === 'dark'
  const filter = dark ? 'brightness-0 invert opacity-80' : 'brightness-0 opacity-60'
  return (
    <section aria-label={featuredIn.heading} className={clsx(dark ? 'on-dark bg-kauri text-white' : 'bg-paper', className)}>
      <Container className="flex flex-col items-center gap-5 py-10 md:flex-row md:justify-between md:gap-10 md:py-12">
        <p className={clsx('shrink-0 text-lg font-semibold', dark ? 'text-white' : 'text-ink')}>{featuredIn.heading}</p>
        <Img
          name={featuredIn.compact}
          alt=""
          sizes="(min-width: 768px) 0px, 90vw"
          className={clsx('h-auto w-full max-w-md md:hidden', filter)}
        />
        <Img
          name={featuredIn.wide}
          alt=""
          sizes="(min-width: 768px) 800px, 0px"
          className={clsx('hidden h-auto w-full max-w-4xl md:block', filter)}
        />
        <ul className="sr-only">
          {featuredIn.outlets.map((outlet) => (
            <li key={outlet}>{outlet}</li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
