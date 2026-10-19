import { useId, useState, type ReactNode } from 'react'
import { Plane } from 'lucide-react'
import clsx from 'clsx'
import { useReducedMotion } from 'motion/react'
import { destinations } from '../../content/destinations'
import { episodes } from '../../content/podcast'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { EpisodePlayButton } from '../player/EpisodePlayButton'
import { RouteMap } from './RouteMap'
import './board.css'

type Dest = 'nz' | 'canada'
type Party = 'solo' | 'partner' | 'family'

const DEST_OPTIONS: { value: Dest; label: string }[] = [
  { value: 'nz', label: 'New Zealand' },
  { value: 'canada', label: 'Canada' },
]
const PARTY_OPTIONS: { value: Party; label: string; pass: string }[] = [
  { value: 'solo', label: 'Just me', pass: 'Just me' },
  { value: 'partner', label: 'Me and my partner', pass: 'Me and my partner' },
  { value: 'family', label: 'My family', pass: 'My family' },
]
const NURSE_EPISODE = episodes.find((e) => e.number === 11)!
const NURSE_MINUTES = Math.round(NURSE_EPISODE.durationSeconds / 60)
const CITY: Record<Dest, { code: string; city: string }> = {
  nz: { code: destinations.nz.airport, city: 'Auckland' },
  canada: { code: destinations.canada.airport, city: 'Toronto' },
}

function Chip({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  children: ReactNode
}) {
  return (
    <label className="relative cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex min-h-12 items-center rounded-full border-2 border-fern bg-white px-5 text-[1.0625rem] font-semibold text-fern transition-colors peer-checked:bg-fern peer-checked:text-white peer-hover:bg-mist peer-checked:peer-hover:bg-fern-dark peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-fern">
        {children}
      </span>
    </label>
  )
}

/** A value on the pass. Keyed by its text, so only the field that changed remounts and plays the flip. */
function Field({ label, value, big = false, className }: { label: string; value: string; big?: boolean; className?: string }) {
  return (
    <div className={className}>
      <p className="font-board text-[0.8125rem] uppercase leading-none text-ink-muted">{label}</p>
      <p
        className={clsx(
          'font-board mt-1.5 uppercase leading-none text-kauri [perspective:400px]',
          big ? 'text-[2.25rem] sm:text-[3.5rem]' : 'text-[1.25rem] sm:text-[1.375rem]',
        )}
      >
        <span key={value} className="pass-field-in">
          {value}
        </span>
      </p>
    </div>
  )
}

/** Barcode-like stub, drawn as SVG bars. The bar pattern is derived from the choices, so it changes with the pass. */
function Barcode({ seed }: { seed: string }) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  const bars: { x: number; w: number }[] = []
  let x = 0
  for (let i = 0; i < 34 && x < 118; i++) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0
    const w = 1 + (h % 4)
    if (i % 2 === 0) bars.push({ x, w })
    x += w + 1
  }
  return (
    <svg viewBox="0 0 120 44" aria-hidden="true" className="h-9 w-full max-w-[9rem] text-kauri" preserveAspectRatio="none">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="44" fill="currentColor" />
      ))}
    </svg>
  )
}

export function FindYourRoute() {
  const uid = useId()
  const reduced = useReducedMotion() ?? false
  const [dest, setDest] = useState<Dest>('nz')
  const [party, setParty] = useState<Party>('family')
  const [nurse, setNurse] = useState(false)
  /** Counts destination changes only. Zero means the default route is shown fully drawn and static. */
  const [flights, setFlights] = useState(0)

  const isNurse = dest === 'nz' && nurse
  const to = CITY[dest]
  const partyLabel = PARTY_OPTIONS.find((p) => p.value === party)!.pass
  const destination = destinations[dest]
  const params = new URLSearchParams({ destination: dest, party })
  if (isNurse) params.set('nurse', '1')
  const bookHref = `/connect/?${params.toString()}`

  return (
    <section id="find-your-route" tabIndex={-1} aria-labelledby="route-title" className="bg-mist py-12 outline-none sm:py-14 lg:py-20">
      <Container className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-y-8 xl:gap-x-16">
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 id="route-title" tabIndex={-1} className="font-display text-[clamp(2rem,4.2vw,3.5rem)] outline-none">
            Find your route
          </h2>
          <p className="mt-4 max-w-[44ch] text-ink-muted">Tell us where you want to go and who is coming. This is routing, not advice.</p>

          <form className="mt-6 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <legend className="mb-3 text-[1.25rem] font-semibold">Where to?</legend>
              <div className="flex flex-wrap gap-3">
                {DEST_OPTIONS.map((o) => (
                  <Chip
                    key={o.value}
                    name={`${uid}-dest`}
                    value={o.value}
                    checked={dest === o.value}
                    onChange={() => {
                      setDest(o.value)
                      setFlights((n) => n + 1)
                    }}
                  >
                    {o.label}
                  </Chip>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-3 text-[1.25rem] font-semibold">Who’s coming?</legend>
              <div className="flex flex-wrap gap-3">
                {PARTY_OPTIONS.map((o) => (
                  <Chip key={o.value} name={`${uid}-party`} value={o.value} checked={party === o.value} onChange={() => setParty(o.value)}>
                    {o.label}
                  </Chip>
                ))}
              </div>
            </fieldset>
            {/* The slot is always rendered, so choosing Canada hides the toggle without moving anything below it. */}
            <label
              className={clsx(
                'flex max-w-[34rem] cursor-pointer items-start gap-4 rounded-card bg-white p-4 transition-opacity duration-200',
                dest !== 'nz' && 'invisible opacity-0',
              )}
            >
              <input
                type="checkbox"
                role="switch"
                checked={nurse}
                disabled={dest !== 'nz'}
                onChange={(e) => setNurse(e.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="relative mt-0.5 h-7 w-12 shrink-0 rounded-full bg-ink-muted transition-colors after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-fern peer-checked:after:translate-x-5 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-fern"
              />
              <span className="leading-snug">I’m a nurse and want to become a Registered Nurse in New Zealand</span>
            </label>
          </form>
        </div>

        <div data-cta-zone className="flex flex-wrap items-start gap-x-6 gap-y-4 lg:col-start-1 lg:row-start-2 lg:self-start">
          <div className="max-w-[22rem]">
            <ButtonLink href={bookHref}>Book my free assessment</ButtonLink>
            <p className="mt-2 text-[0.9375rem] leading-snug text-ink-muted">Free. We don’t charge you a fee just to speak to us.</p>
          </div>
          {isNurse ? (
            <EpisodePlayButton
              episode={NURSE_EPISODE}
              label={`Listen: a nurse from the Philippines who became a resident in New Zealand (${NURSE_MINUTES} min)`}
              activeLabel="Pause the nurse’s story"
              variant="primary"
              className="max-w-[24rem] border-2 border-fern bg-transparent! text-left text-fern! hover:bg-fern! hover:text-white!"
            />
          ) : (
            <ButtonLink href={destination.path} variant="secondary">
              Read about studying in {destination.name}
            </ButtonLink>
          )}
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <p className="sr-only" role="status">
            Boarding pass updated: Manila to {to.city}, {partyLabel}
            {isNurse ? ', Registered Nurse in New Zealand' : ''}
          </p>
          <div className="relative rounded-card bg-white">
            <RouteMap key={`${dest}-${flights}`} dest={dest} fly={flights > 0 && !reduced} />
            <div className="flex flex-col md:flex-row">
              <div className="min-w-0 flex-1 p-4 sm:p-6 lg:px-8 lg:py-6">
                <div className="flex items-center justify-between border-b border-line pb-2.5">
                  <p className="font-board text-[0.9375rem] uppercase text-fern">Boarding pass</p>
                  <p className="font-board text-[0.9375rem] uppercase text-ink-muted">Secure Visa</p>
                </div>
                <div className="mt-3.5 flex items-center gap-4 sm:mt-4 sm:gap-8">
                  <Field label="Manila" value="MNL" big />
                  <Plane aria-hidden="true" className="size-7 shrink-0 text-fern sm:size-9" />
                  <Field label={to.city} value={to.code} big />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3.5 sm:gap-x-8">
                  <Field label="Passenger" value={partyLabel} />
                  <Field label="Pathway" value={isNurse ? 'Mapped in your free assessment' : 'Study → work → residence'} />
                </div>
              </div>
              {/* Perforated stub with notches */}
              <div className="relative flex flex-col justify-between gap-4 border-t-2 border-dashed border-line p-4 md:w-44 md:border-l-2 md:border-t-0 md:p-5">
                <span aria-hidden="true" className="absolute -left-3 -top-3 size-6 rounded-full bg-mist md:hidden" />
                <span
                  aria-hidden="true"
                  className="absolute -right-3 -top-3 size-6 rounded-full bg-mist md:-bottom-3 md:left-[-0.75rem] md:right-auto md:top-auto"
                />
                <div className="grid w-full grid-cols-2 gap-x-4 gap-y-3.5 md:grid-cols-1">
                  <Field label="Gate" value="Free assessment" />
                  <Field label="Class" value="Student pathway" />
                </div>
                <Barcode seed={`${dest}-${party}-${isNurse}`} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
