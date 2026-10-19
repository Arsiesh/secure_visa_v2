import { useEffect, useRef } from 'react'
import { Pause, Play, X } from 'lucide-react'
import { usePlayerActions, usePlayerState } from './playerContext'

/** Bare-bones docked bar shown when the real PlayerBar chunk fails to load, so playback can still be controlled. */
export default function PlayerBarFallback() {
  const { episode, status } = usePlayerState()
  const actions = usePlayerActions()
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const root = document.documentElement
    const apply = () => root.style.setProperty('--player-h', `${el.offsetHeight}px`)
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--player-h')
    }
  }, [])

  if (!episode) return null
  const isPlaying = status === 'playing' || status === 'loading'

  return (
    <section
      ref={barRef}
      data-player-bar
      aria-label="Podcast player"
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-kauri text-white"
    >
      <div className="mx-auto flex max-w-[96rem] items-center gap-3 px-3 py-2 sm:px-5 md:py-3 lg:px-8">
        <button
          type="button"
          onClick={actions.toggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-signal text-kauri transition-colors hover:bg-white"
        >
          {isPlaying ? <Pause aria-hidden="true" className="size-6 fill-current" /> : <Play aria-hidden="true" className="size-6 fill-current" />}
        </button>
        <p className="min-w-0 flex-1 truncate font-semibold">
          <span className="text-white/80">Episode {episode.number}: </span>
          {episode.title}
        </p>
        <button
          type="button"
          onClick={() => location.reload()}
          className="inline-flex h-11 shrink-0 items-center px-2 text-sm underline underline-offset-4 hover:text-signal"
        >
          Reload page
        </button>
        <button
          type="button"
          onClick={actions.close}
          aria-label="Close player"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
        >
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>
    </section>
  )
}
