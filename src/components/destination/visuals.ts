import type { Destination } from '../../content/destinations'

type Photo = { name: string; alt: string; caption?: string; className?: string }

export type DestinationVisuals = {
  /** Wayfinding tag shown in the hero, in the board face. */
  route: string
  /** Hero photo; cropped (in source pixels) to the part of the photo clear of the old green swoosh. */
  hero: { name: string; crop: { x: number; y: number; w: number; h: number } }
  story: Photo
  promise: Photo
  remain: Photo
  presentation: Photo
  /** Arrival-hall photos, when the destination has them. */
  arrivals?: Photo[]
  heroTag: string
}

export const visuals: Record<Destination['slug'], DestinationVisuals> = {
  nz: {
    route: 'MNL → AKL',
    heroTag: 'Manila to Auckland',
    hero: { name: 'nz-section-1-background.webp', crop: { x: 1450, y: 385, w: 470, h: 480 } },
    story: {
      name: 'success-story-photo-img-7140-1-scaled.webp',
      alt: 'Grace, John and their daughter holding a “Welcome to New Zealand from your Secure Visa family” sign at Auckland Airport',
      caption: 'Grace & John, welcomed at Auckland Airport',
      className: 'object-[62%_30%]',
    },
    promise: {
      name: 'canada-image-1.webp',
      alt: 'A Secure Visa specialist meeting a couple across a table',
    },
    remain: {
      name: 'nz-section-2-image.webp',
      alt: 'Jan and Aina Sacdalan with their daughter, with Auckland’s harbourside buildings behind them',
      className: 'origin-[49%_55%] scale-[1.9]',
    },
    presentation: {
      name: 'canada-image-3.webp',
      alt: 'A Secure Visa presentation on a laptop video call, with Jan and Aina at a whiteboard',
    },
    arrivals: [
      {
        name: 'success-story-photo-img-7197-scaled.webp',
        alt: 'Jhilyn de la Cruz and a friend holding a Welcome to New Zealand sign',
        caption: 'Jhilyn de la Cruz',
        className: 'object-[50%_40%]',
      },
      {
        name: 'success-story-photo-img-7387-scaled.webp',
        alt: 'Kim Barnes and a friend holding a Welcome to New Zealand sign',
        caption: 'Kim Barnes',
        className: 'object-[50%_40%]',
      },
      {
        name: 'success-story-photo-img-7405-scaled.webp',
        alt: 'Jade Molina and a friend laughing, holding a Welcome to New Zealand sign',
        caption: 'Jade Molina',
        className: 'object-[50%_40%]',
      },
    ],
  },
  canada: {
    route: 'MNL → YYZ',
    heroTag: 'Manila to Toronto',
    hero: { name: 'canada-banner.webp', crop: { x: 1440, y: 360, w: 554, h: 575 } },
    story: {
      name: 'canada-background.webp',
      alt: 'Jan and Aina Sacdalan with their daughter, smiling by the water',
      className: 'object-[40%_50%]',
    },
    promise: {
      name: 'canada-image-1.webp',
      alt: 'A Secure Visa specialist meeting a couple across a table',
    },
    remain: {
      name: 'canada-image-2.webp',
      alt: 'Aina and Jan leading a meeting with clients around a table',
      className: 'origin-center scale-[1.15] object-[50%_40%]',
    },
    presentation: {
      name: 'canada-image-3.webp',
      alt: 'A Secure Visa presentation on a laptop video call, with Jan and Aina at a whiteboard',
    },
  },
}
