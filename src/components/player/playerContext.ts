import { createContext, useContext } from 'react'
import type { PodcastEpisode } from '../../content/podcast'

export const PLAYBACK_RATES = [1, 1.25, 1.5, 2] as const
export type PlaybackRate = (typeof PLAYBACK_RATES)[number]

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'

/** Changes rarely (start, pause, speed, error). Safe for many consumers. */
export type PlayerState = {
  episode: PodcastEpisode | null
  status: PlayerStatus
  rate: PlaybackRate
  /** Set when an episode started from a remembered position, in seconds. */
  resumedAt: number | null
}

/** Changes about four times a second. Only the bar reads it. */
export type PlayerTime = { current: number; duration: number }

export type PlayerActions = {
  play: (episode: PodcastEpisode) => void
  toggle: () => void
  seek: (seconds: number) => void
  skip: (deltaSeconds: number) => void
  setRate: (rate: PlaybackRate) => void
  retry: () => void
  close: () => void
}

const idleState: PlayerState = { episode: null, status: 'idle', rate: 1, resumedAt: null }
const noop = () => {}

export const PlayerStateContext = createContext<PlayerState>(idleState)
export const PlayerTimeContext = createContext<PlayerTime>({ current: 0, duration: 0 })
export const PlayerActionsContext = createContext<PlayerActions>({
  play: noop,
  toggle: noop,
  seek: noop,
  skip: noop,
  setRate: noop,
  retry: noop,
  close: noop,
})

export const usePlayerState = () => useContext(PlayerStateContext)
export const usePlayerTime = () => useContext(PlayerTimeContext)
export const usePlayerActions = () => useContext(PlayerActionsContext)
