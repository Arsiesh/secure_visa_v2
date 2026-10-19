import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import clsx from 'clsx'
import type { PodcastEpisode } from '../../content/podcast'
import { formatClock } from '../player/format'
import { usePlayerState, usePlayerTime } from '../player/playerContext'
import { PLAYED_MARGIN, RESUME_MIN, useSavedPosition } from './savedPosition'

/** Fires once, the first time the element is 40% visible. Immediately true when motion is reduced. */
function useSeenOnce(reduced: boolean) {
  const ref = useRef<HTMLSpanElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])
  return { ref, seen: seen || reduced || typeof IntersectionObserver === 'undefined' }
}

type BarProps = { seconds: number; duration: number; live?: boolean }

function Bar({ seconds, duration, live = false }: BarProps) {
  const reduced = useReducedMotion() ?? false
  const { ref, seen } = useSeenOnce(reduced)
  const [settled, setSettled] = useState(false)
  const played = seconds >= duration - PLAYED_MARGIN
  const fraction = duration > 0 ? Math.min(1, seconds / duration) : 0
  const label = played ? 'Played' : live ? `${formatClock(seconds)} of ${formatClock(duration)}` : `Resume at ${formatClock(seconds)}`
  return (
    <span ref={ref} className="inline-flex items-center gap-2.5 text-[0.9375rem] text-ink-muted">
      <span aria-hidden="true" className="relative block h-1 w-20 overflow-hidden rounded-full bg-line sm:w-28">
        <span
          onTransitionEnd={() => setSettled(true)}
          className={clsx('absolute inset-0 origin-left rounded-full bg-fern', reduced && 'transition-none')}
          style={{
            transform: `scaleX(${seen ? fraction : 0})`,
            // First view draws the fill in over 600ms; after that (and while live) it only follows the value.
            transition: reduced ? 'none' : settled ? 'transform 300ms linear' : 'transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />
      </span>
      <span className={clsx('tabular-nums', live && !played && 'font-semibold text-fern-dark')}>{label}</span>
    </span>
  )
}

/** Only rendered for the loaded episode, so only this one row re-renders on every player tick. */
function LiveBar({ episode, saved }: { episode: PodcastEpisode; saved: number }) {
  const { current } = usePlayerTime()
  return <Bar seconds={current > 0 ? current : saved} duration={episode.durationSeconds} live />
}

/** A thin progress track and label: live for the episode in the player, otherwise the saved position. */
export function ListenProgress({ episode, className }: { episode: PodcastEpisode; className?: string }) {
  const { episode: loaded } = usePlayerState()
  const saved = useSavedPosition(episode.number)
  const isLoaded = loaded?.number === episode.number
  if (isLoaded) {
    return (
      <span className={className}>
        <LiveBar episode={episode} saved={saved} />
      </span>
    )
  }
  if (saved < RESUME_MIN) return null
  return (
    <span className={className}>
      <Bar seconds={saved} duration={episode.durationSeconds} />
    </span>
  )
}
