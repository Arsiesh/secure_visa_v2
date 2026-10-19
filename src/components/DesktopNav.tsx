import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { isNavGroup, nav } from '../content/site'
import { NavDisclosure } from './NavDisclosure'

/** Desktop navigation. At most one disclosure is open, and it closes on Escape, outside click, focus leaving, and navigation. */
export function DesktopNav() {
  const { pathname } = useLocation()
  // The open menu is remembered together with the path it was opened on, so navigating closes it without an effect.
  const [opened, setOpened] = useState<{ label: string; path: string } | null>(null)
  const openLabel = opened && opened.path === pathname ? opened.label : null
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!openLabel) return
    const root = navRef.current
    const onPointerDown = (event: PointerEvent) => {
      if (root && !root.contains(event.target as Node)) setOpened(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpened(null)
      root?.querySelector<HTMLElement>('button[aria-expanded="true"]')?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openLabel])

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpened(null)
      }}
    >
      <ul className="flex items-center gap-1">
        {nav.map((item) => (
          <li key={item.label}>
            {isNavGroup(item) ? (
              <NavDisclosure
                group={item}
                pathname={pathname}
                open={openLabel === item.label}
                onToggle={() => setOpened(openLabel === item.label ? null : { label: item.label, path: pathname })}
              />
            ) : (
              <NavLink
                to={item.href}
                viewTransition
                end
                className={({ isActive }) =>
                  clsx(
                    'inline-flex min-h-11 items-center rounded-full px-4 text-base font-medium transition-colors hover:bg-white/10 hover:text-white',
                    isActive
                      ? 'text-white underline decoration-signal decoration-2 underline-offset-[10px]'
                      : 'text-white/80',
                  )
                }
              >
                {item.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
