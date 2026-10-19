import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { brand, contact, funnel, icef, legalLinks, nav, offices, socials, isNavGroup } from '../content/site'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { Img } from './Img'
import { SocialIcon } from './SocialIcon'

// Flatten the primary nav for the footer, in reading order.
const footerLinks = nav.flatMap((item) => (isNavGroup(item) ? item.children : [item]))
const gateCodes: Record<string, string> = { makati: 'MNL', auckland: 'AKL' }

const linkClass =
  'inline-flex min-h-11 items-center text-base text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline'

export function SiteFooter() {
  return (
    <footer className="on-dark border-t border-line-dark bg-kauri text-white">
      <Container className="pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Img name={brand.logoFooter} alt="Secure Visa" className="h-10 w-auto" />
            <p className="mt-8 max-w-[32ch] text-[clamp(1.5rem,2.8vw,2.375rem)] font-semibold leading-[1.2] tracking-tight text-pretty">
              {brand.tagline}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 lg:col-span-5 lg:items-end lg:text-right">
            <ButtonLink href="/connect/" variant="onDark">
              Book a free assessment
            </ButtonLink>
            <ButtonLink href={funnel.nzVideo.href} variant="ghost">
              {funnel.nzVideo.label}
            </ButtonLink>
            <div className="mt-3 flex flex-col gap-0.5 lg:items-end">
              <a href={contact.emailHref} className="inline-flex min-h-11 items-center gap-3 text-lg font-medium">
                <Mail aria-hidden="true" className="size-5 text-kawakawa" />
                {contact.email}
              </a>
              <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-lg font-medium">
                <Phone aria-hidden="true" className="size-5 text-kawakawa" />
                {contact.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-12 border-t border-line-dark pt-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <section aria-labelledby="footer-offices" className="lg:col-span-5">
            <h2 id="footer-offices" className="text-[0.9375rem] font-medium text-kawakawa">
              Our offices
            </h2>
            <ul className="mt-5 grid gap-7 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {offices.map((office) => (
                <li key={office.id}>
                  <div className="flex items-center gap-3">
                    <span className="font-board rounded-md border border-signal/50 px-2 py-0.5 text-lg uppercase leading-tight text-signal">
                      {gateCodes[office.id]}
                    </span>
                    <span className="text-lg font-semibold">{office.label}</span>
                  </div>
                  <address className="mt-3 text-base not-italic leading-relaxed text-white/80">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-labelledby="footer-explore" className="lg:col-span-4">
            <h2 id="footer-explore" className="text-[0.9375rem] font-medium text-kawakawa">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/connect/" className={linkClass}>
                  Contact us
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-8 md:col-span-2 lg:col-span-3">
            <section aria-labelledby="footer-follow">
              <h2 id="footer-follow" className="text-[0.9375rem] font-medium text-kawakawa">
                Follow us
              </h2>
              <ul className="mt-4 flex gap-2">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name}, ${social.handle} (opens in a new tab)`}
                      className="inline-flex size-12 items-center justify-center rounded-full border border-line-dark text-white transition-colors hover:border-white hover:bg-white/10"
                    >
                      <SocialIcon id={social.id} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <a href={icef.link} className="group flex items-center gap-4" target="_blank" rel="noopener noreferrer">
              <Img name={icef.badge} alt="" className="h-20 w-auto shrink-0" />
              <span className="text-base leading-snug text-white/85 group-hover:text-white">
                <span className="block font-semibold text-white">ICEF accredited agency</span>
                Agency #{icef.agencyNumber}
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-dark pt-6 text-[0.9375rem] text-white/75 md:flex-row md:items-center md:justify-between">
          <p>{brand.legalLine}</p>
          <ul className="flex flex-wrap gap-x-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
