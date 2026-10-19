import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { PodcastEpisode } from '../../content/podcast'
import PlayerBarFallback from './PlayerBarFallback'
import { loadPlayerBar } from './playerBarLoader'
import {
  PlayerActionsContext,
  PlayerStateContext,
  PlayerTimeContext,
  type PlaybackRate,
  type PlayerActions,
  type PlayerState,
  type PlayerStatus,
  type PlayerTime,
} from './playerContext'
import { clearPosition, loadPosition, savePosition } from './resume'

// If the chunk is gone (a redeploy renamed it) or the network drops, fall back to a minimal bar instead of taking the site down.
const PlayerBar = lazy(() => loadPlayerBar().catch(() => ({ default: PlayerBarFallback })))

const SAVE_EVERY_MS = 5000
/** Positions this close to the start or the end are not worth resuming. */
const RESUME_MIN = 5
const RESUME_END_MARGIN = 10

type MediaSessionModule = typeof import('./mediaSession')

/**
 * Owns the one <audio> element for the whole site, so playback survives page navigation.
 * Nothing autoplays: play() is only ever called from a click or key press.
 */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const episodeRef = useRef<PodcastEpisode | null>(null)
  const rateRef = useRef<PlaybackRate>(1)
  const startAtRef = useRef(0)
  const lastSavedRef = useRef(0)
  const triggerRef = useRef<HTMLElement | null>(null)
  const sessionRef = useRef<MediaSessionModule | null>(null)
  const resumeTimer = useRef<number | undefined>(undefined)

  const [state, setState] = useState<PlayerState>({ episode: null, status: 'idle', rate: 1, resumedAt: null })
  const [time, setTime] = useState<PlayerTime>({ current: 0, duration: 0 })
  const [announcement, setAnnouncement] = useState('')

  const setStatus = (status: PlayerStatus) => setState((s) => (s.status === status ? s : { ...s, status }))

  const actions = useMemo<PlayerActions>(() => {
    const audio = () => audioRef.current
    const savePositionNow = () => {
      const a = audio()
      const ep = episodeRef.current
      if (a && ep && a.currentTime > 0) savePosition(ep.number, a.currentTime)
    }
    const startPlayback = () => {
      audio()
        ?.play()
        .catch((error: unknown) => {
          const name = error instanceof DOMException ? error.name : ''
          // AbortError: a newer load replaced this one. NotAllowedError: the browser wants another gesture.
          if (name === 'AbortError') return
          setState((s) => ({ ...s, status: name === 'NotAllowedError' ? 'paused' : 'error' }))
        })
    }
    const seek = (seconds: number) => {
      const a = audio()
      const ep = episodeRef.current
      if (!a || !ep) return
      const limit = Number.isFinite(a.duration) && a.duration > 0 ? a.duration : ep.durationSeconds
      const target = Math.min(Math.max(0, seconds), limit)
      a.currentTime = target
      startAtRef.current = 0
      sessionRef.current?.setPosition(a)
      setTime((t) => ({ ...t, current: target }))
      setState((s) => (s.resumedAt === null ? s : { ...s, resumedAt: null }))
      savePosition(ep.number, target)
    }

    return {
      play(episode) {
        const a = audio()
        if (!a) return
        const active = document.activeElement
        if (active instanceof HTMLElement && !active.closest('[data-player-bar]')) triggerRef.current = active
        if (episodeRef.current?.number === episode.number) {
          if (a.paused) startPlayback()
          return
        }
        savePositionNow()
        const saved = loadPosition(episode.number)
        startAtRef.current = saved >= RESUME_MIN && saved < episode.durationSeconds - RESUME_END_MARGIN ? saved : 0
        episodeRef.current = episode
        window.clearTimeout(resumeTimer.current)
        setState((s) => ({ ...s, episode, status: 'loading', resumedAt: null }))
        setTime({ current: 0, duration: episode.durationSeconds })
        setAnnouncement(`Loading Episode ${episode.number}: ${episode.title}`)
        a.src = episode.audioUrl
        a.defaultPlaybackRate = rateRef.current
        a.playbackRate = rateRef.current
        startPlayback()
      },
      toggle() {
        const a = audio()
        if (!a || !episodeRef.current) return
        if (a.error) actions.retry()
        else if (a.paused) startPlayback()
        else a.pause()
      },
      seek,
      skip(delta) {
        const a = audio()
        if (a) seek(a.currentTime + delta)
      },
      setRate(rate) {
        const a = audio()
        rateRef.current = rate
        if (a) {
          a.defaultPlaybackRate = rate
          a.playbackRate = rate
          sessionRef.current?.setPosition(a)
        }
        setState((s) => ({ ...s, rate }))
        setAnnouncement(`Speed ${rate} times`)
      },
      retry() {
        const a = audio()
        const ep = episodeRef.current
        if (!a || !ep) return
        startAtRef.current = Math.max(a.currentTime, loadPosition(ep.number))
        setState((s) => ({ ...s, status: 'loading' }))
        a.load()
        startPlayback()
      },
      close() {
        const a = audio()
        savePositionNow()
        episodeRef.current = null
        window.clearTimeout(resumeTimer.current)
        if (a) {
          a.pause()
          a.removeAttribute('src')
          a.load()
        }
        sessionRef.current?.clear()
        setState((s) => ({ ...s, episode: null, status: 'idle', resumedAt: null }))
        setAnnouncement('Player closed')
        const trigger = triggerRef.current
        // Wait for the bar to leave the DOM, then hand focus back to the button that started the episode,
        // or to <main> if that button is gone (the episode was started on another page).
        requestAnimationFrame(() => {
          ;(trigger?.isConnected ? trigger : document.getElementById('main'))?.focus({ preventScroll: true })
        })
      },
    }
  }, [])

  // Lock screen and headphone controls, loaded on first play.
  const episode = state.episode
  useEffect(() => {
    if (!episode) return
    let live = true
    void import('./mediaSession').then((m) => {
      if (!live) return
      sessionRef.current = m
      m.bindHandlers(actions, () => audioRef.current)
      m.setMetadata(episode)
    })
    return () => {
      live = false
    }
  }, [episode, actions])

  useEffect(() => {
    sessionRef.current?.setPlaybackState(state.status)
  }, [state.status])

  // Remember the position if the tab is closed mid-episode.
  useEffect(() => {
    const save = () => {
      const a = audioRef.current
      const ep = episodeRef.current
      if (a && ep && a.currentTime > 0) savePosition(ep.number, a.currentTime)
    }
    window.addEventListener('pagehide', save)
    return () => window.removeEventListener('pagehide', save)
  }, [])

  const handleMetadata = () => {
    const a = audioRef.current
    const ep = episodeRef.current
    if (!a || !ep) return
    const duration = Number.isFinite(a.duration) && a.duration > 0 ? a.duration : ep.durationSeconds
    const startAt = startAtRef.current
    startAtRef.current = 0
    if (startAt > 0) {
      a.currentTime = startAt
      sessionRef.current?.setPosition(a)
      setState((s) => ({ ...s, resumedAt: startAt }))
      setAnnouncement(`Resumed Episode ${ep.number} at ${Math.floor(startAt / 60)} minutes ${Math.floor(startAt % 60)} seconds`)
      window.clearTimeout(resumeTimer.current)
      resumeTimer.current = window.setTimeout(() => setState((s) => ({ ...s, resumedAt: null })), 8000)
    }
    setTime({ current: startAt || a.currentTime, duration })
  }

  const handleTimeUpdate = () => {
    const a = audioRef.current
    const ep = episodeRef.current
    if (!a || !ep) return
    setTime({ current: a.currentTime, duration: Number.isFinite(a.duration) && a.duration > 0 ? a.duration : ep.durationSeconds })
    const now = Date.now()
    if (now - lastSavedRef.current >= SAVE_EVERY_MS) {
      lastSavedRef.current = now
      savePosition(ep.number, a.currentTime)
      sessionRef.current?.setPosition(a)
    }
  }

  const handlePause = () => {
    const a = audioRef.current
    const ep = episodeRef.current
    if (!a || !ep || a.ended) return
    savePosition(ep.number, a.currentTime)
    sessionRef.current?.setPosition(a)
    setStatus('paused')
    setAnnouncement('Paused')
  }

  const handlePlaying = () => {
    const ep = episodeRef.current
    if (!ep) return
    setStatus('playing')
    setAnnouncement(`Playing Episode ${ep.number}: ${ep.title}`)
  }

  const handleEnded = () => {
    const ep = episodeRef.current
    if (!ep) return
    clearPosition(ep.number)
    setStatus('paused')
    setAnnouncement(`Episode ${ep.number} finished`)
  }

  const handleError = () => {
    if (!episodeRef.current) return
    setStatus('error')
    setAnnouncement("This episode didn't load.")
  }

  return (
    <PlayerActionsContext value={actions}>
      <PlayerStateContext value={state}>
        <PlayerTimeContext value={time}>
          {children}
          <audio
            ref={audioRef}
            preload="none"
            onLoadedMetadata={handleMetadata}
            onDurationChange={handleMetadata}
            onTimeUpdate={handleTimeUpdate}
            onPlaying={handlePlaying}
            onWaiting={() => episodeRef.current && setStatus('loading')}
            onPause={handlePause}
            onEnded={handleEnded}
            onError={handleError}
          />
          <div role="status" aria-live="polite" className="sr-only">
            {announcement}
          </div>
          {episode ? (
            <Suspense fallback={null}>
              <PlayerBar />
            </Suspense>
          ) : null}
        </PlayerTimeContext>
      </PlayerStateContext>
    </PlayerActionsContext>
  )
}
