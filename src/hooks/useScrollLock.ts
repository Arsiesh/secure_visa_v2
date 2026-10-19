import { useEffect } from 'react'

/** Locks page scroll on <html> while `locked` is true (native <dialog> does not do this on iOS). */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [locked])
}
