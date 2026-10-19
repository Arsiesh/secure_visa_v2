import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { brand, headerCta } from '../content/site'
import { useScrolled } from '../hooks/useScrolled'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { DesktopNav } from './DesktopNav'
import { Img } from './Img'
import { MobileMenu } from './MobileMenu'

/**
 * Sticky header on kauri (the logo is white-on-transparent). It is solid at the top of the page,
 * then turns translucent with a blur and a hairline once content scrolls beneath it.
 */
export function SiteHeader() {
  const scrolled = useScrolled(8)

  return (
    <header
      className={clsx(
        'on-dark vt-header sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled ? 'border-line-dark bg-kauri/90 backdrop-blur-xl' : 'border-transparent bg-kauri',
      )}
    >
      <Container size="wide" className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link to="/" viewTransition className="inline-flex min-h-11 shrink-0 items-center">
          <Img name={brand.logoHeader} alt="Secure Visa, home" className="h-8 w-auto lg:h-9" />
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          <DesktopNav />
          <ButtonLink href={headerCta.href} variant="onDark" className="min-h-11 px-5 py-2">
            {headerCta.label}
          </ButtonLink>
        </div>

        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
