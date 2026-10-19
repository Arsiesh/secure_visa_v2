import { useEffect, type MouseEvent } from 'react'
import { ArrowUpRight, Plane } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinations, serviceCards } from '../../content/destinations'
import { Container } from '../Container'
import { Img } from '../Img'
import { imageUrl } from '../../lib/imageUrl'
import { visuals } from '../destination/visuals'

// Same specifiers App.tsx uses, so Vite hands back the chunk that is already loading.
const PAGE_CHUNK = {
  nz: () => import('../../pages/NewZealandPage'),
  canada: () => import('../../pages/CanadaPage'),
} as const

const warmed = new Set<string>()

/** On intent (hover, focus, touch) fetch the page chunk and the hero photo, so the view transition's new snapshot is ready. */
function warm(slug: 'nz' | 'canada') {
  if (warmed.has(slug)) return
  warmed.add(slug)
  void PAGE_CHUNK[slug]().catch(() => warmed.delete(slug))
  new Image().src = imageUrl(visuals[slug].hero.name)
}

const CARDS = [
  { ...serviceCards[0], image: 'nz-section-1-background.webp', alt: 'Auckland’s Sky Tower and harbour', dest: destinations.nz, city: 'Auckland' },
  { ...serviceCards[1], image: 'canada-banner.webp', alt: 'A lake and forested mountains in Canada', dest: destinations.canada, city: 'Toronto' },
] as const

/**
 * Names only the clicked card's photo so it can morph into the hero. Set on the DOM at click time: the router starts
 * the transition right after this handler, before React would re-render. Modified or cancelled clicks are ignored.
 */
function nameChosenPhoto(e: MouseEvent<HTMLAnchorElement>, slug: 'nz' | 'canada') {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const photo = e.currentTarget.querySelector<HTMLElement>('[data-vt-card]')
  if (photo) photo.style.viewTransitionName = `dest-photo-${slug}`
}

function clearPhotoNames() {
  document.querySelectorAll<HTMLElement>('[data-vt-card]').forEach((el) => {
    el.style.viewTransitionName = ''
  })
}

export function DestinationLinks() {
  // A page restored from the back/forward cache must not keep a stale name.
  useEffect(() => {
    window.addEventListener('pageshow', clearPhotoNames)
    return () => {
      window.removeEventListener('pageshow', clearPhotoNames)
      clearPhotoNames()
    }
  }, [])

  return (
    <section aria-labelledby="dest-title" className="bg-paper py-16 sm:py-20 lg:py-28">
      <Container>
        <h2 id="dest-title" className="font-display max-w-[20ch] text-[clamp(1.875rem,3.8vw,3.25rem)]">
          Our immigration consultant services
        </h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {CARDS.map((c, i) => (
            <li key={c.slug} className={i === 1 ? 'lg:mt-12' : ''}>
              <Link
                to={c.href}
                viewTransition
                onPointerEnter={() => warm(c.dest.slug)}
                onClick={(e) => nameChosenPhoto(e, c.dest.slug)}
                onFocus={() => warm(c.dest.slug)}
                onTouchStart={() => warm(c.dest.slug)}
                className="group relative block rounded-card border border-line bg-white focus-visible:outline-offset-4"
              >
                <div
                  data-vt-card
                  className="vt-dest-photo overflow-hidden rounded-t-[calc(1.25rem-1px)]"
                >
                  <Img
                    name={c.image}
                    alt={c.alt}
                    className="aspect-[16/9] w-full origin-bottom-right scale-[2] object-cover object-right transition-transform duration-500 ease-out group-hover:scale-[2.06]"
                  />
                </div>
                {/* Boarding-pass stub: notched, perforated edge, then the route. */}
                <div className="relative border-t-2 border-dashed border-line px-6 py-5 sm:px-8">
                  <span aria-hidden="true" className="absolute -left-3 -top-3 size-6 rounded-full bg-paper" />
                  <span aria-hidden="true" className="absolute -right-3 -top-3 size-6 rounded-full bg-paper" />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-board flex items-center gap-3 text-[1.75rem] leading-none text-kauri">
                        <span>MNL</span>
                        <Plane aria-hidden="true" className="size-5 text-fern" />
                        <span>{c.dest.airport}</span>
                      </p>
                      <p className="mt-3 text-[1.25rem] font-semibold">{c.label}</p>
                    </div>
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-fern text-white transition-colors group-hover:bg-fern-dark">
                      <ArrowUpRight aria-hidden="true" className="size-6" />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
