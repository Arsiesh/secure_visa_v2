import { useId } from 'react'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { closingCta } from '../content/home'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { Img } from './Img'

type CtaBandProps = {
  /** Primary button label, in sentence case. */
  label: string
  href: string
  icon?: LucideIcon
  /** Defaults to the client's closing copy. */
  heading?: string
  body?: readonly string[]
  /** Optional slot between the body copy and the buttons. */
  extra?: ReactNode
  /** Look of the primary button. Defaults to the solid signal button. */
  variant?: 'onDark' | 'ghost'
  className?: string
}

/** The one dark band on a light page: the client's closing call to action, with the founders' tablet. */
export function CtaBand({
  label,
  href,
  icon,
  heading = closingCta.heading,
  body = closingCta.body,
  extra,
  variant = 'onDark',
  className,
}: CtaBandProps) {
  const headingId = useId()
  return (
    <section aria-labelledby={headingId} className={clsx('bg-paper py-10 sm:py-14 lg:py-20', className)}>
      <Container>
        <div data-cta-zone className="on-dark overflow-hidden rounded-[2rem] bg-kauri text-white">
          <div className="grid items-end gap-x-12 px-6 pt-10 sm:px-10 sm:pt-12 lg:grid-cols-12 lg:items-center lg:px-14 lg:py-12">
            <div className="pb-10 sm:pb-12 lg:col-span-8 lg:pb-0">
              <h2 id={headingId} className="font-display max-w-[26ch] text-[clamp(2rem,3vw,2.75rem)]">
                {heading}
              </h2>
              <div className="mt-6 flex max-w-[62ch] flex-col gap-3 text-[1.0625rem] text-white/85">
                {body.map((paragraph, i) => (
                  <p key={paragraph} className={i === 0 ? undefined : i === 1 ? 'hidden md:block' : 'hidden 2xl:block'}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {extra}
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={href} variant={variant} icon={icon}>
                  {label}
                </ButtonLink>
              </div>
            </div>
            <div className="hidden justify-center sm:flex lg:col-span-4 lg:justify-end">
              <Img
                name={closingCta.image}
                alt={closingCta.imageAlt}
                className="block h-auto max-h-[440px] w-full max-w-[20rem] object-contain lg:max-w-[22rem]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
