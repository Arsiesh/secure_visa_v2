import { useId, useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import clsx from 'clsx'
import type { PodcastEpisode, PodcastTopic } from '../../content/podcast'
import { Img } from '../Img'
import { Equaliser } from '../player/Equaliser'
import { EpisodePlayButton } from '../player/EpisodePlayButton'
import { formatEpisodeDate, shortLength } from '../player/format'
import { usePlayerState } from '../player/playerContext'

const TOPIC_LABEL: Record<PodcastTopic, string> = { canada: 'Canada', 'new-zealand': 'New Zealand' }

function linkLabel(href: string) {
  try {
    const { hostname, pathname } = new URL(href)
    return hostname.replace(/^www\./, '') + (pathname === '/' ? '' : pathname)
  } catch {
    return href
  }
}

type EpisodeRowProps = {
  episode: PodcastEpisode
  /** The newest episode, shown larger at the top of the archive. */
  featured?: boolean
}

/** One archive entry: thumbnail, title, date and length, a play button, and the show notes behind a disclosure. */
export function EpisodeRow({ episode, featured = false }: EpisodeRowProps) {
  const { episode: current, status } = usePlayerState()
  const isCurrent = current?.number === episode.number
  const isPlaying = isCurrent && status === 'playing'
  const [open, setOpen] = useState(false)
  const notesId = useId()

  return (
    <li
      className={clsx(
        'relative transition-colors duration-200',
        featured ? 'py-2 lg:py-4' : 'py-6',
        isCurrent && '-mx-4 rounded-card bg-mist px-4 shadow-[inset_4px_0_0_var(--color-fern)]',
      )}
    >
      <div
        className={clsx(
          'grid gap-x-4 gap-y-3 sm:gap-x-6',
          featured
            ? 'grid-cols-[6rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-5'
            : 'grid-cols-[5rem_minmax(0,1fr)] md:grid-cols-[7rem_minmax(0,1fr)_auto]',
        )}
      >
        <Img
          name={episode.thumbnail}
          alt=""
          sizes={featured ? '(min-width: 1024px) 416px, 96px' : '(min-width: 768px) 112px, 80px'}
          className={clsx(
            'aspect-square w-full object-cover',
            featured ? 'rounded-card lg:row-span-3 lg:rounded-photo' : 'rounded-input md:row-span-2 md:rounded-card',
          )}
        />

        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem]">
            <span className="font-semibold">Episode {episode.number}</span>
            {episode.topics.map((topic) => (
              <span key={topic} className="font-semibold text-fern-dark">
                {TOPIC_LABEL[topic]}
              </span>
            ))}
            {isPlaying ? <Equaliser className="text-fern" /> : null}
          </p>
          <h3
            className={clsx(
              'mt-1 [overflow-wrap:anywhere]',
              featured
                ? 'text-lg font-semibold leading-snug sm:text-xl lg:font-display lg:text-[clamp(1.75rem,3vw,2.5rem)]'
                : 'text-lg font-semibold leading-snug text-pretty sm:text-xl',
            )}
          >
            {episode.title}
          </h3>
          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-0.5 text-[0.9375rem] text-ink-muted">
            <time dateTime={episode.date}>{formatEpisodeDate(episode.date)}</time>
            <span>{shortLength(episode.durationSeconds)}</span>
          </p>
        </div>

        <div
          className={clsx(
            'flex items-start justify-center',
            featured ? 'lg:col-start-2 lg:justify-start' : 'md:col-start-3 md:row-start-1 md:self-center',
          )}
        >
          <EpisodePlayButton episode={episode} variant="icon" className={featured ? 'lg:size-16' : undefined} />
        </div>

        <div className={clsx('min-w-0', featured ? 'lg:col-start-2' : 'md:col-start-2 md:col-span-2')}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-0 sm:gap-x-6">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={notesId}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-fern underline-offset-4 hover:underline"
            >
              Show notes
              <span className="sr-only"> for Episode {episode.number}</span>
              <ChevronDown
                aria-hidden="true"
                className={clsx('size-5 transition-transform motion-reduce:transition-none', open && 'rotate-180')}
              />
            </button>
            <a
              href={episode.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] text-ink-muted sm:text-[0.9375rem] underline underline-offset-4 hover:text-fern-dark"
            >
              Episode page
              <span className="sr-only"> for Episode {episode.number} (opens in a new tab)</span>
              <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </div>
          {open ? (
            <div id={notesId} className="mt-2 max-w-[68ch] space-y-3 border-l-2 border-line pl-4 text-[1rem] text-pretty">
              {episode.notes.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {episode.links.length > 0 ? (
                <ul className="space-y-1">
                  {episode.links.map((href) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-fern underline underline-offset-4">
                        {linkLabel(href)}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  )
}
