import { homePodcast } from '../../content/home'
import { episodes, platforms } from '../../content/podcast'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { Img } from '../Img'
import { EpisodePlayButton } from '../player/EpisodePlayButton'
import { formatEpisodeDate } from '../player/format'
import { ListenProgress } from '../podcast/ListenProgress'

const latest = episodes.slice(0, 3)

export function PodcastSection() {
  return (
    <section aria-labelledby="podcast-title" className="bg-paper py-16 sm:py-20 lg:py-28">
      <Container className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="podcast-title" className="font-display text-[clamp(1.875rem,3.8vw,3.25rem)]">
            {homePodcast.heading}
          </h2>
          <p className="mt-5 max-w-[48ch]">{homePodcast.body}</p>
          <div className="mt-7">
            <ButtonLink href={homePodcast.cta.href}>{homePodcast.cta.label}</ButtonLink>
          </div>
        </div>
        <ol className="flex flex-col gap-5 lg:col-span-7" aria-label="Latest episodes">
          {latest.map((e) => (
            <li key={e.number} className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-x-4 rounded-card bg-mist p-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:gap-x-5">
              <Img name={e.thumbnail} alt="" sizes="136px" className="row-span-2 aspect-square w-full rounded-[0.875rem] object-cover sm:row-span-1" />
              <div className="min-w-0">
                <p className="text-[0.9375rem] text-ink-muted">
                  Episode {e.number}
                  <time dateTime={e.date} className="ml-3">
                    {formatEpisodeDate(e.date)}
                  </time>
                </p>
                <p className="mt-1 text-[1.125rem] font-semibold leading-snug [overflow-wrap:anywhere]">{e.title}</p>
                <ListenProgress episode={e} className="mt-2 block" />
              </div>
              <EpisodePlayButton episode={e} variant="icon" className="col-start-2 mt-3 justify-self-start sm:col-start-3 sm:row-start-1 sm:mt-0 sm:mr-1 sm:justify-self-auto" />
            </li>
          ))}
        </ol>
        <div className="lg:col-span-12">
          <p className="font-semibold">{homePodcast.subscribe}</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {platforms.map((p) => (
              <li key={p.name}>
                <a href={p.href} className="flex min-h-16 sm:min-h-20 items-center justify-center rounded-input border border-line bg-white px-3 py-2 hover:border-fern" target="_blank" rel="noopener noreferrer">
                  <Img name={p.logo} alt="" className="h-12 w-[90%] object-contain sm:h-16" />
                  <span className="sr-only">Listen on {p.name} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
