import { Loader2, Pause, Play } from 'lucide-react'
import clsx from 'clsx'
import type { PodcastEpisode } from '../../content/podcast'
import { preloadPlayerBar } from './playerBarLoader'
import { usePlayerActions, usePlayerState } from './playerContext'

type EpisodePlayButtonProps = {
  episode: PodcastEpisode
  /** Visible text next to the icon, for example "Play the latest episode". Omit for an icon-only button. */
  label?: string
  /** Visible text while this episode is playing. Defaults to "Pause". */
  activeLabel?: string
  /** primary: fern fill. onDark: signal fill. icon: round 48px button for list rows. */
  variant?: 'primary' | 'onDark' | 'icon'
  className?: string
}

const variants = {
  primary: 'min-h-12 gap-2.5 rounded-full bg-fern px-6 py-2.5 text-white hover:bg-fern-dark',
  onDark: 'min-h-12 gap-2.5 rounded-full bg-signal px-6 py-2.5 text-kauri hover:bg-white focus-visible:outline-signal',
  icon: 'size-12 rounded-full bg-fern text-white hover:bg-fern-dark',
} as const

/** Starts, pauses or resumes one episode in the site-wide player. The accessible name always names the episode. */
export function EpisodePlayButton({ episode, label, activeLabel = 'Pause', variant = 'icon', className }: EpisodePlayButtonProps) {
  const { episode: current, status } = usePlayerState()
  const { play, toggle } = usePlayerActions()
  const isCurrent = current?.number === episode.number
  const active = isCurrent && (status === 'playing' || status === 'loading')
  const verb = active ? 'Pause' : 'Play'
  // The name always starts with the visible text, so voice-control users can say what they see.
  const name = label
    ? `${active ? activeLabel : label}, Episode ${episode.number}: ${episode.title}`
    : `${verb} Episode ${episode.number}: ${episode.title}`

  return (
    <button
      type="button"
      aria-label={name}
      onClick={() => (isCurrent ? toggle() : play(episode))}
      onPointerEnter={preloadPlayerBar}
      onFocus={preloadPlayerBar}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center text-[1.0625rem] font-semibold leading-tight transition-colors duration-200 focus-visible:outline-offset-4',
        variants[variant],
        className,
      )}
    >
      {isCurrent && status === 'loading' ? (
        <Loader2 aria-hidden="true" className="size-5 shrink-0 motion-safe:animate-spin" />
      ) : active ? (
        <Pause aria-hidden="true" className="size-5 shrink-0 fill-current" />
      ) : (
        <Play aria-hidden="true" className="size-5 shrink-0 fill-current" />
      )}
      {label ? <span>{active ? activeLabel : label}</span> : null}
    </button>
  )
}
