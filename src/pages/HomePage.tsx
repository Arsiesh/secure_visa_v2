import { CtaBand } from '../components/CtaBand'
import { ArrivalsHero } from '../components/home/ArrivalsHero'
import { ArrivalsWall } from '../components/home/ArrivalsWall'
import { DestinationLinks } from '../components/home/DestinationLinks'
import { FindYourRoute } from '../components/home/FindYourRoute'
import { FoundersStory } from '../components/home/FoundersStory'
import { PodcastSection } from '../components/home/PodcastSection'
import { ProcessPreview } from '../components/home/ProcessPreview'
import { SituationSection } from '../components/home/SituationSection'
import { TrustSection } from '../components/home/TrustSection'
import { brand, funnel } from '../content/site'

export default function HomePage() {
  return (
    <>
      <title>Secure Visa — Study your way to residency in New Zealand and Canada</title>
      <meta name="description" content={brand.tagline} />
      <ArrivalsHero />
      <FindYourRoute />
      <FoundersStory />
      <SituationSection />
      <ProcessPreview />
      <ArrivalsWall />
      <DestinationLinks />
      <TrustSection />
      <PodcastSection />
      <CtaBand
        label="Watch the free 40-min NZ video"
        href={funnel.nzVideo.href}
        secondary={{ label: 'Book a free assessment', href: '/connect/' }}
      />
    </>
  )
}
