import { useState } from 'react'
import { Container } from '../components/Container'
import { CtaBand } from '../components/CtaBand'
import { PageHero } from '../components/PageHero'
import { ArrivalsWall } from '../components/stories/ArrivalsWall'
import { Letters } from '../components/stories/Letters'
import { Lightbox, type LightboxItem } from '../components/stories/Lightbox'
import { ReviewsWall } from '../components/stories/ReviewsWall'
import { arrivalPhotos, extraArrivalPhoto, reviewGraphics, storiesIntro, type StoryPhoto } from '../content/stories'
import { longTestimonials } from '../content/testimonials'
import { headerCta } from '../content/site'

const wallPhotos: StoryPhoto[] = [
  ...arrivalPhotos,
  { id: 'extra', image: extraArrivalPhoto.image, name: '', alt: extraArrivalPhoto.alt },
]
const arrivalItems: LightboxItem[] = wallPhotos.map((p) => ({
  image: p.image,
  alt: p.alt,
  caption: p.name ? `${p.name}, welcomed at Auckland Airport` : 'Welcomed at the airport',
}))
const reviewItems: LightboxItem[] = reviewGraphics.map((r) => ({
  image: r.image,
  alt: r.alt,
  caption: [r.name, r.role, r.from].filter(Boolean).join(', ') || 'Client review',
}))

type Open = { set: 'arrivals' | 'reviews'; index: number } | null

export default function StoriesPage() {
  const [open, setOpen] = useState<Open>(null)
  const items = open?.set === 'reviews' ? reviewItems : arrivalItems

  return (
    <>
      <title>Success stories | Secure Visa</title>
      <meta
        name="description"
        content="We’ve helped more than 1,000 people begin their immigration to New Zealand. See the families we’ve welcomed and what they say."
      />
      <PageHero
        title={storiesIntro.title}
        intro={<p>{storiesIntro.lead}</p>}
        image={{
          name: 'testimonial-raz-family-scaled.webp',
          alt: 'The Raz family cheering in the Auckland Airport arrivals hall, holding a sign that reads “Welcome to New Zealand, Raz Family, from your Secure Visa family”',
          className: 'object-center',
        }}
      >
        <p className="font-display mt-10 max-w-[26ch] text-[clamp(1.375rem,2.4vw,1.875rem)] !font-bold !leading-tight text-signal">
          {storiesIntro.stat}
        </p>
      </PageHero>

      <section aria-labelledby="arrivals-h" className="bg-paper py-16 lg:py-24">
        <Container>
          <h2 id="arrivals-h" className="font-display max-w-[22ch] text-[clamp(1.875rem,3.8vw,3rem)]">
            {storiesIntro.subheading}
          </h2>
          <p className="mt-5 max-w-[60ch] text-lg text-ink-muted">{storiesIntro.invite}</p>
          <div className="mt-10">
            <ArrivalsWall photos={wallPhotos} onOpen={(index) => setOpen({ set: 'arrivals', index })} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="reviews-h" className="bg-mist py-16 lg:py-24">
        <Container>
          <h2 id="reviews-h" className="font-display max-w-[22ch] text-[clamp(1.875rem,3.8vw,3rem)]">
            In their own words
          </h2>
          <div className="mt-10">
            <ReviewsWall reviews={reviewGraphics} onOpen={(index) => setOpen({ set: 'reviews', index })} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="letters-h" className="bg-paper py-16 lg:py-24">
        <Container>
          <h2 id="letters-h" className="font-display max-w-[22ch] text-[clamp(1.875rem,3.8vw,3rem)]">
            Letters from our clients
          </h2>
          <div className="mt-10">
            <Letters letters={longTestimonials} />
          </div>
        </Container>
      </section>

      <CtaBand label={headerCta.label} href={headerCta.href} />

      <Lightbox
        items={items}
        index={open?.index ?? null}
        onIndexChange={(index) => setOpen((o) => (o ? { ...o, index } : o))}
        onClose={() => setOpen(null)}
      />
    </>
  )
}
