import { useEffect, useRef, useState } from 'react'
import { Img } from '../Img'
import type { ReviewGraphic } from '../../content/stories'

type ReviewsWallProps = {
  reviews: readonly ReviewGraphic[]
  onOpen: (index: number) => void
}

const STEP = 12

export function ReviewsWall({ reviews, onOpen }: ReviewsWallProps) {
  const [shown, setShown] = useState(STEP)
  const visible = Math.min(shown, reviews.length)
  const listRef = useRef<HTMLUListElement>(null)
  const focusFrom = useRef<number | null>(null)

  // After a reveal, move focus to the first newly added review (the button that was pressed unmounts at the end).
  useEffect(() => {
    if (focusFrom.current === null) return
    listRef.current?.querySelectorAll('button')[focusFrom.current]?.focus()
    focusFrom.current = null
  }, [visible])

  return (
    <div>
      <ul ref={listRef} className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {reviews.slice(0, visible).map((review, index) => (
          <li
            key={review.id}
            className="[content-visibility:auto] [contain-intrinsic-block-size:auto_300px]"
          >
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={`Enlarge review: ${review.alt}`}
              aria-haspopup="dialog"
              className="group block w-full overflow-hidden rounded-card bg-white focus-visible:outline-offset-[-4px]"
            >
              <Img
                name={review.image}
                alt={review.alt}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-center gap-4">
        <p role="status" aria-live="polite" className="text-ink-muted">
          Showing {visible} of {reviews.length} reviews
        </p>
        {visible < reviews.length ? (
          <button
            type="button"
            onClick={() => {
              focusFrom.current = visible
              setShown((n) => n + STEP)
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-fern px-6 py-2.5 text-[1.0625rem] font-semibold text-fern transition-colors hover:bg-fern hover:text-white"
          >
            Show more reviews
          </button>
        ) : null}
      </div>
    </div>
  )
}
