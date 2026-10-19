import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

export type ButtonVariant = 'primary' | 'secondary' | 'onDark' | 'ghost'

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Internal path ("/connect/") renders a router Link. http(s), mailto and tel render a plain <a>, in the same tab. */
  href: string
  /** primary: fern fill. secondary: fern outline on light. onDark: signal fill on kauri. ghost: paper outline on kauri. */
  variant?: ButtonVariant
  icon?: LucideIcon
  iconPosition?: 'start' | 'end'
  /** Third-party destination: opens in a new tab with a hidden hint for screen readers. */
  newTab?: boolean
  children: ReactNode
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-2.5 text-center text-[1.0625rem] font-semibold leading-tight transition-[color,background-color,border-color,transform] duration-200 focus-visible:outline-offset-4 active:scale-[0.98] motion-reduce:active:scale-100'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-fern text-white hover:bg-fern-dark',
  secondary: 'border-2 border-fern text-fern hover:bg-fern hover:text-white',
  onDark: 'bg-signal text-kauri hover:bg-white focus-visible:outline-signal',
  ghost: 'border-2 border-white/60 text-white hover:border-white hover:bg-white/10 focus-visible:outline-signal',
}

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i

export function ButtonLink({
  href,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'start',
  className,
  newTab,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = clsx(base, variants[variant], className)
  const content = (
    <>
      {Icon && iconPosition === 'start' ? <Icon aria-hidden="true" className="size-5 shrink-0" /> : null}
      <span>{children}</span>
      {newTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      {Icon && iconPosition === 'end' ? <Icon aria-hidden="true" className="size-5 shrink-0" /> : null}
    </>
  )

  if (EXTERNAL.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return (
    <Link to={href} viewTransition className={classes} {...rest}>
      {content}
    </Link>
  )
}
