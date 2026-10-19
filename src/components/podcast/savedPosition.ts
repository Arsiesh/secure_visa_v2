import { useSyncExternalStore } from 'react'
import { loadPosition } from '../player/resume'

const subscribe = (notify: () => void) => {
  window.addEventListener('storage', notify)
  return () => window.removeEventListener('storage', notify)
}

/**
 * The saved listening position for an episode, in seconds (0 when none).
 * The snapshot is a plain number read straight from localStorage, so it is re-read on every render.
 * Callers already re-render when the player's episode or status changes, which is when positions are saved.
 * The storage event covers other tabs.
 */
export function useSavedPosition(episodeNumber: number): number {
  return useSyncExternalStore(
    subscribe,
    () => loadPosition(episodeNumber),
    () => 0,
  )
}

/** The player resumes from five seconds on; within 30 seconds of the end we call the episode played. */
export const RESUME_MIN = 5
export const PLAYED_MARGIN = 30
