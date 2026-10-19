import { useEffect, useRef, type MouseEvent, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { imageMeta } from '../../content/imageMeta'
import { useScrollLock } from '../../hooks/useScrollLock'
import { imageUrl } from '../../lib/imageUrl'

export type LightboxItem = { image: string; alt: string; caption?: string }

type LightboxProps = {
  items: readonly LightboxItem[]
  /** Index of the open item, or null when closed. */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const SWIPE_PX = 50

export function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const swipeStart = useRef<number | null>(null)
  const swiped = useRef(false)
  const open = index !== null
  useScrollLock(open)

  // Open and close the native dialog; remember who opened it so focus can go back.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      opener.current = document.activeElement as HTMLElement | null
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Preload the neighbours so prev/next feel instant.
  useEffect(() => {
    if (index === null) return
    for (const offset of [-1, 1]) {
      const item = items[(index + offset + items.length) % items.length]
      if (item) new Image().src = imageUrl(item.image)
    }
  }, [index, items])

  const item = index !== null ? items[index] : undefined
  const go = (step: number) => {
    if (index === null) return
    onIndexChange((index + step + items.length) % items.length)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.clientX
    swiped.current = false
  }
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return
    const delta = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(delta) > SWIPE_PX) {
      swiped.current = true
      go(delta < 0 ? 1 : -1)
    }
  }
  // The stage fills the dialog, so a click on its own empty area (not the photo or buttons) is a click on the backdrop.
  // A swipe that ends on empty stage also fires click there, so it must not close the viewer.
  const onStageClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget && !swiped.current) dialogRef.current?.close()
  }

  const meta = item ? imageMeta[item.image] : undefined
  const buttonClass =
    'grid size-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-signal'

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      onClose={() => {
        onClose()
        opener.current?.focus()
      }}
      onKeyDown={onKeyDown}
      className="on-dark m-0 size-full max-h-none max-w-none bg-kauri/95 p-0 text-white backdrop:bg-kauri/90 open:flex open:flex-col"
    >
      {item ? (
        <>
          <div className="flex items-center justify-between px-4 py-3 sm:px-8">
            <p className="font-board text-xl tabular-nums" aria-live="polite">
              {(index ?? 0) + 1} / {items.length}
              <span className="sr-only">: {item.caption ?? item.alt}</span>
            </p>
            <button type="button" onClick={() => dialogRef.current?.close()} className={buttonClass} aria-label="Close viewer">
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-2 sm:px-20"
            onClick={onStageClick}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipeStart.current = null)}
          >
            <img
              key={item.image}
              src={imageUrl(item.image)}
              alt={item.alt}
              width={meta?.w}
              height={meta?.h}
              draggable={false}
              className="max-h-full max-w-full rounded-card object-contain"
            />
            <button
              type="button"
              onClick={() => go(-1)}
              className={`${buttonClass} absolute left-2 top-1/2 -translate-y-1/2 sm:left-5`}
              aria-label="Previous photo"
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={`${buttonClass} absolute right-2 top-1/2 -translate-y-1/2 sm:right-5`}
              aria-label="Next photo"
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          </div>
          <p className="px-4 py-4 text-center text-lg sm:px-8">{item.caption ?? ' '}</p>
        </>
      ) : null}
    </dialog>
  )
}
