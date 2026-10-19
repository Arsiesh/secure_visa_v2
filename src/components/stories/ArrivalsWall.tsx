import clsx from 'clsx'
import { Img } from '../Img'
import type { StoryPhoto } from '../../content/stories'

type ArrivalsWallProps = {
  photos: readonly StoryPhoto[]
  onOpen: (index: number) => void
}

// Tiles that take a 2x2 block from sm up, so the wall reads as moments of different weight, not a uniform grid.
const BIG = new Set([0, 7, 16, 23])
// On phones only two of them stay big, so the 2-column wall does not repeat full-width tiles.
const BIG_MOBILE = new Set([0, 16])

export function ArrivalsWall({ photos, onOpen }: ArrivalsWallProps) {
  return (
    <ul className="grid grid-flow-dense grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2 lg:grid-cols-6">
      {photos.map((photo, index) => {
        const big = BIG.has(index)
        const bigOnPhone = BIG_MOBILE.has(index)
        return (
          <li
            key={photo.id}
            className={clsx(
              'relative',
              !big && 'aspect-square',
              big && bigOnPhone && 'col-span-2 row-span-2',
              big && !bigOnPhone && 'aspect-square sm:aspect-auto',
              big && 'sm:col-span-2 sm:row-span-2',
            )}
          >
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={photo.name ? `Open photo: ${photo.name}` : 'Open photo'}
              className="group absolute inset-0 block size-full overflow-hidden rounded-card bg-mist text-left"
            >
              <Img
                name={photo.image}
                alt={photo.alt}
                sizes={big ? '(min-width: 1024px) 34vw, 100vw' : '(min-width: 1024px) 17vw, 50vw'}
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              {photo.name ? (
                <span
                  className={clsx(
                    'absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate rounded-full bg-kauri/85 px-2.5 py-1 text-xs font-semibold leading-tight text-white sm:text-sm',
                    big && 'sm:text-base',
                  )}
                >
                  {photo.name}
                </span>
              ) : null}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
