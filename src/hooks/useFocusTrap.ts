import { useEffect, type RefObject } from 'react'
import { useScrollLock } from './useScrollLock'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * While `active`, keeps Tab and Shift+Tab inside `ref`, moves focus into it, locks body scroll,
 * and returns focus to whatever was focused before when it deactivates.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useScrollLock(active)
  useEffect(() => {
    const container = ref.current
    if (!active || !container) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    const focusables = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
    ;(container.querySelector<HTMLElement>('[data-autofocus]') ?? focusables()[0])?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      } else if (!container.contains(current)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [ref, active])
}
