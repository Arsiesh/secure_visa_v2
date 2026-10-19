import { Headphones } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { CtaBand } from '../components/CtaBand'
import { Img } from '../components/Img'
import { TeamGrid } from '../components/team/TeamGrid'
import { VideoFacade } from '../components/team/VideoFacade'
import { founders, teamIntro, teamVideo } from '../content/team'
import { podcastIntro } from '../content/podcast'
import { headerCta } from '../content/site'

export default function TeamPage() {
  return (
    <>
      <title>Meet the team | Secure Visa</title>
      <meta name="description" content={teamIntro.body} />

      <section className="on-dark bg-kauri text-white">
        <Container className="py-14 lg:py-24">
          <h1 className="font-display max-w-[20ch] text-[clamp(2.25rem,6vw,4.5rem)]">{teamIntro.title}</h1>
          <p className="mt-6 max-w-[48ch] text-lg text-white/90 sm:text-xl">{teamIntro.body}</p>
        </Container>
      </section>

      <section aria-labelledby="founders-heading" className="bg-mist">
        <Container className="grid items-center gap-8 pt-12 lg:grid-cols-12 lg:gap-0 lg:py-0">
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Img
              name={founders.photo}
              alt={founders.alt}
              className="mx-auto h-auto w-full max-w-md lg:max-w-none"
            />
          </div>
          <div className="pb-14 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:py-24">
            <h2 id="founders-heading" className="font-display text-[clamp(1.875rem,4vw,3.25rem)]">
              {founders.names}
            </h2>
            <p className="mt-3 text-lg font-semibold text-fern-dark">{founders.role}</p>
            <p className="mt-6 max-w-[56ch] text-pretty">{founders.bio[0]}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="specialists-heading" className="bg-paper">
        <Container className="py-16 lg:py-24">
          <h2 id="specialists-heading" className="font-display max-w-[20ch] text-[clamp(1.875rem,4vw,3rem)]">
            The specialists who work with your family
          </h2>
          <div className="mt-10 lg:mt-14">
            <TeamGrid />
          </div>
        </Container>
      </section>

      <section aria-labelledby="video-heading" className="bg-mist">
        <Container className="grid gap-8 py-16 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <h2
            id="video-heading"
            className="font-display text-[clamp(1.875rem,4vw,3.25rem)] lg:col-span-4"
          >
            {teamVideo.title}
          </h2>
          <div className="lg:col-span-8">
            <VideoFacade />
          </div>
        </Container>
      </section>

      <section aria-labelledby="podcast-heading" className="bg-paper">
        <Container className="grid items-center gap-8 py-14 md:grid-cols-[auto_1fr] md:gap-12 lg:py-20">
          <Img
            name={podcastIntro.cover}
            alt={podcastIntro.coverAlt}
            className="h-auto w-40 rounded-card md:w-48"
          />
          <div>
            <h2 id="podcast-heading" className="font-display text-[clamp(1.5rem,3vw,2.25rem)]">
              {podcastIntro.title}
            </h2>
            <p className="mt-4 max-w-[60ch]">{podcastIntro.body}</p>
            <div className="mt-6">
              <ButtonLink href="/podcast/" variant="secondary" icon={Headphones}>
                Listen to the podcast
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand label={headerCta.label} href={headerCta.href} />
    </>
  )
}
