import { useId, useState } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import clsx from 'clsx'
import { contact, icef, offices } from '../../content/site'
import { Container } from '../Container'
import { Img } from '../Img'

const makati = offices.find((o) => o.id === 'makati')!
const auckland = offices.find((o) => o.id === 'auckland')!
const mapsUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

const linkClass = 'font-semibold text-fern underline underline-offset-4 hover:text-fern-dark'

/** A compact, factual "is this legit?" strip. The check steps are user-triggered and never claim more than the ICEF listing shows. */
export function VerifyStrip() {
  const panelId = useId()
  const [open, setOpen] = useState(false)

  return (
    <section aria-label="Verify Secure Visa" className="border-y border-line bg-paper py-8 sm:py-10">
      <Container>
        <div className="grid items-start gap-x-10 gap-y-6 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="flex items-center gap-4">
            <Img name={icef.badge} alt={icef.badgeAlt} className="h-auto w-20 shrink-0 sm:w-24" />
            <div>
              <p className="text-[1.25rem] font-semibold leading-tight">ICEF accredited agency</p>
              <p className="mt-1 text-ink-muted">Agency #{icef.agencyNumber}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Offices in Makati City and at Auckland Airport</p>
            <ul className="mt-2 flex flex-col gap-3 text-[0.9375rem] text-ink-muted">
              {[makati, auckland].map((o) => (
                <li key={o.id}>
                  <span className="block">{o.full}</span>
                  <a href={mapsUrl(o.full)} target="_blank" rel="noopener noreferrer" className={clsx(linkClass, 'mt-0.5 inline-flex min-h-11 items-center gap-1.5')}>
                    <MapPin aria-hidden="true" className="size-4 shrink-0" />
                    <span>
                      Open in Google Maps<span className="sr-only">: {o.city} office</span>
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-fern px-6 text-[1.0625rem] font-semibold text-fern transition-colors hover:bg-fern hover:text-white focus-visible:outline-offset-4"
            >
              How to check us
              <ChevronDown aria-hidden="true" className={clsx('size-5 shrink-0 transition-transform', open && 'rotate-180')} />
            </button>
            <div id={panelId} hidden={!open}>
              <ol className="mt-5 flex max-w-[56ch] list-decimal flex-col gap-3 pl-6 marker:font-semibold marker:text-fern">
                <li>
                  <a href={icef.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Open our listing on the ICEF website<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>Check that it shows Secure Visa Consulting, Inc.</li>
                <li>
                  Visit or call our Makati office: {makati.full}.{' '}
                  <a href={contact.phoneHref} className={linkClass}>
                    {contact.phone}
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
