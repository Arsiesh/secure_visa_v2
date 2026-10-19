import { useId } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import type { NavGroup } from '../content/site'
import { isCurrentPath } from '../lib/isCurrentPath'

type NavDisclosureProps = {
  group: NavGroup
  pathname: string
  open: boolean
  onToggle: () => void
}

/** One desktop disclosure menu: a button with aria-expanded that reveals a short list of links. */
export function NavDisclosure({ group, pathname, open, onToggle }: NavDisclosureProps) {
  const panelId = useId()
  const hasCurrent = group.children.some((child) => isCurrentPath(pathname, child.href))

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={clsx(
          'inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-base font-medium transition-colors hover:bg-white/10 hover:text-white',
          hasCurrent || open ? 'text-white' : 'text-white/80',
          hasCurrent && 'underline decoration-signal decoration-2 underline-offset-[10px]',
        )}
      >
        {group.label}
        {hasCurrent ? <span className="sr-only"> (current section)</span> : null}
        <ChevronDown
          aria-hidden="true"
          className={clsx('size-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {open ? (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.25, 1, 0.5, 1] }}
            className="absolute left-0 top-full z-10 mt-2 w-72 rounded-card border border-line-dark bg-kauri-2 p-2 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.5)]"
          >
            <ul>
              {group.children.map((child) => (
                <li key={child.href}>
                  <NavLink
                    to={child.href}
                    end
                    className={({ isActive }) =>
                      clsx(
                        'block rounded-[0.875rem] px-4 py-3 transition-colors hover:bg-white/10',
                        isActive && 'bg-white/10',
                      )
                    }
                  >
                    <span className="block text-base font-semibold text-white">{child.label}</span>
                    {child.description ? (
                      <span className="mt-0.5 block text-sm leading-snug text-white/75">{child.description}</span>
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
