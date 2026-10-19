// Last listening position per episode. localStorage can be missing or throw (private windows, blocked storage), so every access is guarded.
const key = (episodeNumber: number) => `sv-podcast-position-${episodeNumber}`

export function loadPosition(episodeNumber: number): number {
  try {
    const value = Number(localStorage.getItem(key(episodeNumber)))
    return Number.isFinite(value) && value > 0 ? value : 0
  } catch {
    return 0
  }
}

export function savePosition(episodeNumber: number, seconds: number): void {
  try {
    if (seconds > 0) localStorage.setItem(key(episodeNumber), String(Math.floor(seconds)))
  } catch {
    // Storage unavailable: resuming simply won't work.
  }
}
