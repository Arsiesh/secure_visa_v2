import { Users } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { CtaBand } from '../components/CtaBand'
import { FeaturedIn } from '../components/FeaturedIn'
import { Img } from '../components/Img'
import { StoryTimeline } from '../components/about/StoryTimeline'
import { foundersIntro } from '../content/founders'
import { headerCta } from '../content/site'

// From the founders' bio on the team page, verbatim from "Hence" onwards.
const WHY_FOUNDED =
  'It was not a smooth journey and they also met a lot of migrants who experienced the same challenges before achieving their goal. Hence, they have created Secure Visa. To provide the best solutions, give a seamless process, and eliminate the obstacles for aspiring migrants.'

export default function AboutPage() {
  return (
    <>
      <title>Our story | Secure Visa</title>
      <meta
        name="description"
        content="Before we helped thousands begin their emigration to New Zealand, we first did it ourselves. But it almost destroyed us."
      />
      <section className="on-dark bg-kauri text-white">
        <Container className="grid items-center gap-10 pt-12 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-6">
            <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.5rem)]">Our story</h1>
            <p className="mt-6 max-w-[44ch] text-lg text-white/90 sm:text-xl">{foundersIntro.lead}</p>
          </div>
          <div className="lg:col-span-6">
            <Img
              name="about-image-new-04.webp"
              alt="Aina and Jan Sacdalan, founders of Secure Visa, in a taped photo against the Secure Visa wall"
              priority
              className="mx-auto -mt-12 h-auto lg:mt-0 w-full max-w-[28rem] sm:max-w-[34rem] lg:max-w-none lg:scale-110"
            />
          </div>
        </Container>
      </section>

      <StoryTimeline />

      <section aria-labelledby="why-heading" className="bg-mist">
        <Container className="grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-6">
            <h2 id="why-heading" className="font-display max-w-[16ch] text-[clamp(1.875rem,4vw,3.25rem)]">
              Why we started Secure Visa
            </h2>
          </div>
          <div className="flex max-w-[62ch] flex-col gap-5 lg:col-span-6">
            <p>{WHY_FOUNDED}</p>
            <p>{foundersIntro.homeBody[3]}</p>
            <div>
              <ButtonLink href="/meet-the-team/" variant="primary" icon={Users}>
                Meet the team behind Secure Visa
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand label={headerCta.label} href={headerCta.href} />
      <FeaturedIn />
    </>
  )
}
