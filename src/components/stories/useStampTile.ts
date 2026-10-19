import { useCallback } from 'react'

// One observer for every tile. A tile is armed (stamp hidden) and released once, the first time 40% is visible and its photo has loaded.
let observer: IntersectionObserver | null = null
function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-stamp', 'done')
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.4 },
  )
  return observer
}

/** Ref callback for a tile. Sets data attributes directly, so landing a stamp never re-renders React. */
export function useStampTile() {
  return useCallback((el: HTMLElement | null) => {
    if (!el) return
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.setAttribute('data-stamp', 'armed')
    const img = el.querySelector('img')
    const watch = () => getObserver().observe(el)
    // Never stamp an empty tile: wait for the photo.
    if (!img || (img.complete && img.naturalWidth > 0)) watch()
    else img.addEventListener('load', watch, { once: true })
  }, [])
}
