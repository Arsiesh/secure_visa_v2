import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'motion/react'
import { Mail, Menu, Phone, X } from 'lucide-react'
import clsx from 'clsx'
import { brand, contact, headerCta, isNavGroup, nav } from '../content/site'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { ButtonLink } from './ButtonLink'
import { Img } from './Img'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'flex min-h-14 items-center gap-3 rounded-2xl px-4 text-[1.375rem] font-semibold transition-colors active:bg-white/10',
    isActive ? 'text-signal' : 'text-white',
  )

/** Mobile menu: a button that opens a full-height sheet with a focus trap, Escape to close and scroll lock. */
export function MobileMenu() {
  const { pathname } = useLocation()
  // Remember the path the sheet was opened on, so any navigation closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null)
  const open = openedOn === pathname
  const sheetRef = useRef<HTMLDivElement>(null)
  const close = () => setOpenedOn(null)

  useFocusTrap(sheetRef, open)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedOn(null)
    }
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onChange = () => {
      if (desktop.matches) setOpenedOn(null)
    }
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onChange)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenedOn(pathname)}
        className="-mr-2 inline-flex size-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
      >
        <Menu aria-hidden="true" className="size-7" />
        <span className="sr-only">Open menu</span>
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={sheetRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="on-dark fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-kauri"
          >
            <div className="mx-auto flex h-16 w-full max-w-7xl shrink-0 items-center justify-between px-5 sm:px-8">
              <Link to="/" onClick={close} className="inline-flex min-h-11 items-center">
                <Img name={brand.logoHeader} alt="Secure Visa, home" className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                onClick={close}
                data-autofocus
                className="-mr-2 inline-flex size-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <X aria-hidden="true" className="size-7" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Primary" className="mx-auto w-full max-w-7xl flex-1 px-3 pb-6 pt-2 sm:px-6">
              <ul className="flex flex-col gap-1">
                {nav.map((item) =>
                  isNavGroup(item) ? (
                    <li key={item.label} className="pt-3">
                      <p className="px-4 pb-1 text-[0.9375rem] font-medium text-kawakawa">{item.label}</p>
                      <ul className="flex flex-col gap-1 border-l-2 border-line-dark/70 ml-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavLink to={child.href} end onClick={close} className={linkClass}>
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <NavLink to={item.href} end onClick={close} className={linkClass}>
                        {item.label}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="mx-auto w-full max-w-7xl shrink-0 border-t border-line-dark px-5 pb-8 pt-6 sm:px-8">
              <ButtonLink href={headerCta.href} variant="onDark" onClick={close} className="w-full">
                {headerCta.label}
              </ButtonLink>
              <div className="mt-5 flex flex-col gap-1 text-white">
                <a href={contact.emailHref} className="inline-flex min-h-11 items-center gap-3 text-base">
                  <Mail aria-hidden="true" className="size-5 text-kawakawa" />
                  {contact.email}
                </a>
                <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-base">
                  <Phone aria-hidden="true" className="size-5 text-kawakawa" />
                  {contact.phone}
                </a>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
