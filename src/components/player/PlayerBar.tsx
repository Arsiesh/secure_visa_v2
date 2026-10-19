import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronUp, Loader2, Pause, Play, RotateCcw, RotateCw, X } from 'lucide-react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { platforms } from '../../content/podcast'
import { Img } from '../Img'
import { formatClock, spokenDuration, spokenLength } from './format'
import { PLAYBACK_RATES, usePlayerActions, usePlayerState, usePlayerTime } from './playerContext'
import './range.css'

const spotify = platforms.find((p) => p.name === 'Spotify')

const iconButton =
  'inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10'

/** Docked bottom player. Loaded lazily the first time an episode starts. */
export default function PlayerBar() {
  const { episode, status, rate, resumedAt } = usePlayerState()
  const { current, duration } = usePlayerTime()
  const actions = usePlayerActions()
  const [expanded, setExpanded] = useState(false)
  const barRef = useRef<HTMLElement>(null)
  // What the seek slider tells assistive tech. It follows the live position only on user actions and state changes, never on time ticks.
  const [announced, setAnnounced] = useState(0)
  const positionRef = useRef(0)
  const episodeNumber = episode?.number

  // Publish the bar's height so the page can leave room for it, and html's scroll-padding-bottom (index.css) keeps focused elements out from behind it.
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const root = document.documentElement
    const apply = () => {
      const h = el.offsetHeight
      root.style.setProperty('--player-h', `${h}px`)
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--player-h')
    }
  }, [])

  useEffect(() => {
    positionRef.current = Math.min(current, Math.max(duration, 1))
  })
  useEffect(() => {
    setAnnounced(positionRef.current)
  }, [status, episodeNumber])

  if (!episode) return null

  const max = Math.max(duration, 1)
  const position = Math.min(current, max)
  const announce = (seconds: number) => setAnnounced(Math.min(Math.max(0, seconds), max))
  const pct = (position / max) * 100
  const isPlaying = status === 'playing' || status === 'loading'
  const nextRate = PLAYBACK_RATES[(PLAYBACK_RATES.indexOf(rate) + 1) % PLAYBACK_RATES.length]
  // Back, forward, speed and the slider live behind the chevron on phones, and are always shown from md up.
  const extra = expanded ? '' : 'max-md:hidden'

  return (
    <section
      ref={barRef}
      data-player-bar
      aria-label="Podcast player"
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-kauri text-white"
    >
      <div
        aria-hidden="true"
        className={clsx('absolute inset-x-0 top-0 h-0.5 bg-white/20 md:hidden', expanded && 'hidden')}
      >
        <div className="h-full bg-signal" style={{ width: `${pct}%` }} />
      </div>

      <div className="mx-auto grid max-w-[96rem] grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-x-2 gap-y-1 px-3 py-2 sm:px-5 md:grid-cols-[minmax(0,17rem)_auto_auto_auto_auto_minmax(8rem,1fr)_auto] md:gap-x-3 md:py-3 lg:grid-cols-[minmax(0,24rem)_auto_auto_auto_auto_minmax(8rem,1fr)_auto_auto] lg:px-8">
        <div
          className="col-start-1 row-start-1 flex min-w-0 items-center gap-3 md:cursor-default"
          onClick={() => setExpanded((v) => !v)}
        >
          <Img name={episode.thumbnail} alt="" className="size-11 shrink-0 rounded-input object-cover md:size-12" />
          <div className="min-w-0">
            <p className="flex items-baseline gap-2 text-sm leading-tight text-white/80">
              <span className="shrink-0">Episode {episode.number}</span>
              {resumedAt !== null ? <span className="truncate text-signal">Resumed at {formatClock(resumedAt)}</span> : null}
            </p>
            <p className={clsx('font-semibold leading-snug', expanded ? 'line-clamp-2 [overflow-wrap:anywhere] md:line-clamp-none md:truncate' : 'truncate')}>
              {episode.title}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={actions.toggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="col-start-2 row-start-1 inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-signal text-kauri transition-colors hover:bg-white md:col-start-3"
        >
          {status === 'loading' ? (
            <Loader2 aria-hidden="true" className="size-6 motion-safe:animate-spin" />
          ) : isPlaying ? (
            <Pause aria-hidden="true" className="size-6 fill-current" />
          ) : (
            <Play aria-hidden="true" className="size-6 fill-current" />
          )}
        </button>

        {/* Phones: one centred row under the title. From md up, `contents` drops the wrapper so each button takes its own grid column. */}
        <div className={clsx('col-span-full row-start-2 flex items-center justify-center gap-8 pt-1 md:contents', extra)}>
          <button
            type="button"
            onClick={() => {
              actions.skip(-15)
              announce(position - 15)
            }}
            aria-label="Back 15 seconds"
            className={clsx(iconButton, 'relative md:col-start-2 md:row-start-1')}
          >
            <RotateCcw aria-hidden="true" className="size-7" strokeWidth={1.75} />
            <span aria-hidden="true" className="font-board absolute text-[0.6875rem] leading-none">15</span>
          </button>

          <button
            type="button"
            onClick={() => {
              actions.skip(30)
              announce(position + 30)
            }}
            aria-label="Forward 30 seconds"
            className={clsx(iconButton, 'relative md:col-start-4 md:row-start-1')}
          >
            <RotateCw aria-hidden="true" className="size-7" strokeWidth={1.75} />
            <span aria-hidden="true" className="font-board absolute text-[0.6875rem] leading-none">30</span>
          </button>

          <button
            type="button"
            onClick={() => actions.setRate(nextRate)}
            aria-label={`Playback speed ${rate} times. Change speed.`}
            className="inline-flex h-11 min-w-14 items-center justify-center rounded-full border border-white/40 px-3 text-sm font-semibold tabular-nums transition-colors hover:bg-white/10 md:col-start-5 md:row-start-1"
          >
            {rate}×
          </button>
        </div>

        <div className={clsx('col-span-4 row-start-3 flex items-center gap-3 md:col-span-1 md:col-start-6 md:row-start-1', extra)}>
          <span className="font-board w-[4.5ch] shrink-0 text-right text-base tabular-nums text-white/90">{formatClock(position)}</span>
          <input
            type="range"
            className="sv-range"
            min={0}
            max={max}
            step={5}
            value={position}
            onChange={(e) => {
              actions.seek(Number(e.target.value))
              announce(Number(e.target.value))
            }}
            onFocus={() => announce(position)}
            aria-label="Seek"
            aria-valuenow={announced}
            aria-valuetext={`${spokenDuration(announced)} of ${spokenLength(max)}`}
            style={{ '--pct': `${pct}%` } as CSSProperties}
          />
          <span className="font-board w-[4.5ch] shrink-0 text-base tabular-nums text-white/90">{formatClock(max)}</span>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Hide player controls' : 'Show player controls'}
          className={clsx(iconButton, 'col-start-3 row-start-1 md:hidden')}
        >
          <ChevronUp aria-hidden="true" className={clsx('size-6 transition-transform motion-reduce:transition-none', expanded && 'rotate-180')} />
        </button>

        <Link
          to="/connect/?intent=assessment"
          viewTransition
          className={clsx(
            'col-span-full row-start-5 min-h-11 items-center justify-center text-sm text-white/85 underline underline-offset-4 hover:text-white lg:col-span-1 lg:col-start-7 lg:row-start-1 lg:justify-self-end lg:whitespace-nowrap',
            'hidden lg:flex',
            expanded && 'max-md:flex',
          )}
        >
          Book a free assessment
        </Link>

        <button
          type="button"
          onClick={actions.close}
          aria-label="Close player"
          className={clsx(iconButton, 'col-start-4 row-start-1 md:col-start-7 lg:col-start-8')}
        >
          <X aria-hidden="true" className="size-6" />
        </button>

        {status === 'error' ? (
          <p className="col-span-full row-start-4 flex flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm text-white">
            <span>
              This episode didn't load. Try again, or listen on{' '}
              {spotify ? (
                <a href={spotify.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                  Spotify<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                'Spotify'
              )}
              .
            </span>
            <button
              type="button"
              onClick={actions.retry}
              className="inline-flex h-11 items-center rounded-full bg-signal px-5 font-semibold text-kauri hover:bg-white"
            >
              Try again
            </button>
          </p>
        ) : null}
      </div>
    </section>
  )
}
