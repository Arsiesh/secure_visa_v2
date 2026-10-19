// Lock-screen and headphone controls. Loaded the first time an episode starts.
import type { PodcastEpisode } from '../../content/podcast'
import { imageUrl } from '../../lib/imageUrl'
import type { PlayerActions, PlayerStatus } from './playerContext'

const SEEK_BACK = 15
const SEEK_FORWARD = 30

export const isSupported = () => typeof navigator !== 'undefined' && 'mediaSession' in navigator

export function setMetadata(episode: PodcastEpisode) {
  if (!isSupported()) return
  navigator.mediaSession.metadata = new MediaMetadata({
    title: episode.title,
    artist: 'The Secure Visa Podcast',
    album: `Episode ${episode.number}`,
    artwork: [{ src: new URL(imageUrl(episode.thumbnail), document.baseURI).href, sizes: '626x626', type: 'image/webp' }],
  })
}

export function bindHandlers(actions: PlayerActions, getAudio: () => HTMLAudioElement | null) {
  if (!isSupported()) return
  const session = navigator.mediaSession
  const set = (action: MediaSessionAction, handler: MediaSessionActionHandler | null) => {
    try {
      session.setActionHandler(action, handler)
    } catch {
      // Not every browser supports every action.
    }
  }
  set('play', () => {
    if (getAudio()?.paused) actions.toggle()
  })
  set('pause', () => {
    if (getAudio() && !getAudio()!.paused) actions.toggle()
  })
  set('seekbackward', (d) => actions.skip(-(d.seekOffset ?? SEEK_BACK)))
  set('seekforward', (d) => actions.skip(d.seekOffset ?? SEEK_FORWARD))
  set('seekto', (d) => {
    if (d.seekTime != null) actions.seek(d.seekTime)
  })
}

export function setPlaybackState(status: PlayerStatus) {
  if (!isSupported()) return
  navigator.mediaSession.playbackState = status === 'playing' ? 'playing' : status === 'idle' ? 'none' : 'paused'
}

export function setPosition(audio: HTMLAudioElement) {
  if (!isSupported() || !Number.isFinite(audio.duration) || audio.duration <= 0) return
  try {
    navigator.mediaSession.setPositionState({
      duration: audio.duration,
      playbackRate: audio.playbackRate,
      position: Math.min(audio.currentTime, audio.duration),
    })
  } catch {
    // Some browsers reject odd values; the lock screen just won't show a scrubber.
  }
}

export function clear() {
  if (!isSupported()) return
  navigator.mediaSession.metadata = null
  navigator.mediaSession.playbackState = 'none'
}
