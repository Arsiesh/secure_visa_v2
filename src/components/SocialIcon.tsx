import type { SVGProps } from 'react'
import type { Social } from '../content/site'

const paths: Record<Social['id'], string> = {
  facebook: 'M14 8.5V6.9c0-.7.2-1.1 1.2-1.1H17V3h-2.4C12 3 11 4.6 11 6.6v1.9H9v3h2V21h3v-9h2.4l.4-3H14Z',
  youtube:
    'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2 3.77-2 4 0 4.78 2.6 4.78 6V21h-4v-5.2c0-1.25-.02-2.85-1.75-2.85-1.75 0-2.02 1.36-2.02 2.76V21h-4V9.5Z',
  tiktok:
    'M16.6 3c.3 2.4 1.7 3.9 4 4v3.1c-1.4.1-2.7-.3-4-1.1v6.1c0 3.8-3 6.4-6.4 6.4-3.7 0-6.2-3-6.2-6.2 0-3.9 3.3-6.5 7-6v3.3c-1.7-.4-3.4.7-3.4 2.6 0 1.5 1.2 2.7 2.6 2.7 1.7 0 2.7-1.2 2.7-3V3h3.7Z',
}

/** Simple filled brand glyphs (lucide has no brand icons). Decorative: the link carries the aria-label. */
export function SocialIcon({ id, ...props }: { id: Social['id'] } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d={paths[id]} />
    </svg>
  )
}
