import type { CSSProperties, ReactNode } from 'react'
import './PassportStamp.css'

// Every arrival sign reads "Welcome to New Zealand", so every arrival really is MNL to AKL, landed.
// No dates: we do not have them. The stamp sits on the name pill, never on the photo itself.

/** FNV-1a, so a stamp's angle is stable across renders without randomness. */
function hash(id: string) {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619)
  return h >>> 0
}

/** The ink filter, defined once per page. Rendered by each wall; only one wall is on a page. */
export function StampDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="pointer-events-none absolute">
      <filter id="sv-ink" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.85" result="speck" />
        <feComposite in="SourceGraphic" in2="speck" operator="in" />
      </filter>
    </svg>
  )
}

/** Wrap the photo so the press dip does not fight the hover zoom on the image itself. */
export function StampPress({ children }: { children: ReactNode }) {
  return <span className="sv-stamp-press block">{children}</span>
}

function MiniStamp({ id }: { id: string }) {
  const rot = -8 + (hash(id) % 15)
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 64"
      className="sv-stamp font-board"
      style={{ '--stamp-rot': `${rot}deg` } as CSSProperties}
    >
      <rect x="1.5" y="1.5" width="97" height="61" rx="9" fill="#0f3a27" fillOpacity="0.94" stroke="currentColor" strokeWidth="3.4" />
      <rect x="8" y="8" width="84" height="48" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text x="50" y="26" textAnchor="middle" fontSize="16" fill="currentColor" letterSpacing="2.5">ARRIVED</text>
      <text x="50" y="49" textAnchor="middle" fontSize="25" fontWeight="800" fill="currentColor" letterSpacing="3">AKL</text>
    </svg>
  )
}

type StampedNameProps = {
  id: string
  /** The name on the sign. Without one the stamp stands alone in the bottom-left corner. */
  name: string
  /** Typography and padding for the pill; colours and the room for the stamp are added here. */
  pillClassName: string
  /** Stories tiles truncate long names (as before stamps); the home wall let them wrap onto two lines. */
  truncate?: boolean
}

/** The name pill plus its stamp. The stamp straddles the pill's top-right corner, on a reserved patch of pill. */
export function StampedName({ id, name, pillClassName, truncate = true }: StampedNameProps) {
  return (
    <span className="sv-name absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)]" data-named={name ? '' : undefined}>
      {name ? <span className={`block min-w-0 ${truncate ? 'truncate' : ''} rounded-full bg-kauri/85 text-white ${pillClassName}`}>{name}</span> : null}
      <MiniStamp id={id} />
    </span>
  )
}
