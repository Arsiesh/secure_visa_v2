import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { CtaBand } from '../components/CtaBand'
import { Img } from '../components/Img'
import { EpisodeRow, FeaturedEpisode } from '../components/podcast/EpisodeList'
import { episodes, platforms, podcastArchiveHref, podcastIntro } from '../content/podcast'

const [latest, ...earlier] = episodes

export default function PodcastPage() {
  return (
    <>
      <title>The Secure Visa podcast | Secure Visa</title>
      <meta name="description" content={podcastIntro.body} />

      <section className="on-dark bg-kauri text-white">
        <Container className="grid items-center gap-8 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="lg:col-span-7">
            <h1 className="font-display max-w-[14ch] text-[clamp(2.5rem,6vw,4.75rem)]">{podcastIntro.title}</h1>
            <p className="mt-6 max-w-[52ch] text-lg text-white/90 sm:text-xl">{podcastIntro.body}</p>
          </div>
          <div className="lg:col-span-5">
            <Img
              name={podcastIntro.phoneMockup}
              alt="A phone playing the Secure Visa podcast with Jan and Aina"
              priority
              sizes="(min-width: 1024px) 460px, 70vw"
              className="mx-auto h-auto w-full max-w-[17rem] lg:max-w-[26rem]"
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="subscribe-heading" className="bg-mist">
        <Container className="py-12 lg:py-16">
          <h2 id="subscribe-heading" className="font-display text-[clamp(1.5rem,3vw,2.25rem)]">
            Subscribe now
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
            {platforms.map((platform) => (
              <li key={platform.name}>
                <a
                  href={platform.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`Listen on ${platform.name} (opens in a new tab)`}
                  className="flex min-h-20 items-center justify-center rounded-card border border-line bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:border-fern hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <Img name={platform.logo} alt="" className="h-11 w-auto max-w-full scale-125 object-contain sm:h-12" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="episodes-heading" className="bg-paper">
        <Container className="py-16 lg:py-24">
          <h2 id="episodes-heading" className="font-display text-[clamp(1.875rem,4vw,3rem)]">
            Latest episodes
          </h2>
          <div className="mt-8 lg:mt-12">
            <FeaturedEpisode episode={latest} />
          </div>
          <ul className="mt-10 max-w-3xl divide-y divide-line border-t border-line">
            {earlier.map((episode) => (
              <EpisodeRow key={episode.number} episode={episode} />
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href={podcastArchiveHref} newTab variant="secondary" icon={ArrowUpRight} iconPosition="end">
              See every episode
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBand label="Book a free assessment" href="/connect/" />
    </>
  )
}
