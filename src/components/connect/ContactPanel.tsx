import { Mail, MapPin, Phone } from 'lucide-react'
import { contact, offices, socials } from '../../content/site'
import { SocialIcon } from '../SocialIcon'

const tags = { makati: 'MNL', auckland: 'AKL' } as const
const tap =
  'flex min-h-14 items-center gap-3 rounded-card bg-kauri px-5 py-3 text-lg font-semibold text-white transition-colors hover:bg-kauri-2 on-dark'

export function ContactPanel() {
  return (
    <aside aria-label="Contact details" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <a href={contact.emailHref} className={tap}>
          <Mail aria-hidden="true" className="size-6 shrink-0 text-signal" />
          {contact.email}
        </a>
        <a href={contact.phoneHref} className={tap}>
          <Phone aria-hidden="true" className="size-6 shrink-0 text-signal" />
          {contact.phone}
        </a>
      </div>

      <ul className="flex flex-col gap-6">
        {offices.map((office) => (
          <li key={office.id} className="border-t border-line pt-5">
            <p className="flex items-center gap-3">
              <span className="font-board rounded-input bg-kauri px-2.5 py-0.5 text-xl text-signal">{tags[office.id]}</span>
              <span className="font-semibold">
                {office.label}, {office.city}
              </span>
            </p>
            <address className="mt-3 not-italic text-ink-muted">
              {office.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.full)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-fern underline underline-offset-4"
            >
              <MapPin aria-hidden="true" className="size-5" />
              Open in Google Maps
              <span className="sr-only"> ({office.city}, opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="border-t border-line pt-5">
        <h2 className="font-semibold">You can also connect with us on</h2>
        <ul className="mt-3 flex gap-3">
          {socials.map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name}, ${s.handle} (opens in a new tab)`}
                className="grid size-12 place-items-center rounded-full border-2 border-line text-ink transition-colors hover:border-fern hover:text-fern"
              >
                <SocialIcon id={s.id} className="size-6" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
