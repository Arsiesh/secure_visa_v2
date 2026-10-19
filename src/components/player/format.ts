/** Clock text: 5:07 or 1:02:09. */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = String(s % 60).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`
}

const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

/** Spoken duration for screen readers: "12 minutes 5 seconds". */
export function spokenDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const parts: string[] = []
  if (h) parts.push(unit(h, 'hour'))
  if (m) parts.push(unit(m, 'minute'))
  if (sec || parts.length === 0) parts.push(unit(sec, 'second'))
  return parts.join(' ')
}

/** "31 January 2022" from a YYYY-MM-DD string, independent of the viewer's time zone. */
export function formatEpisodeDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  )
}

/** "34 minutes", or "1 hour 18 minutes" for long episodes (rounded to the nearest minute). */
export function spokenLength(totalSeconds: number): string {
  const minutes = Math.round(totalSeconds / 60)
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return [h ? unit(h, 'hour') : '', m || !h ? unit(m, 'minute') : ''].filter(Boolean).join(' ')
}

/** "34 min" or "1 hr 18 min" for lists. */
export function shortLength(totalSeconds: number): string {
  const minutes = Math.round(totalSeconds / 60)
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? `${h} hr ${m} min` : `${m} min`
}
