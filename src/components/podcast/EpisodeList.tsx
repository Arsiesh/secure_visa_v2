import { ExternalLink } from 'lucide-react'
import type { PodcastEpisode } from '../../content/podcast'
import { Img } from '../Img'

const TOPIC_LABEL = { canada: 'Canada', 'new-zealand': 'New Zealand' } as const

function EpisodeTag({ episode }: { episode: PodcastEpisode }) {
  return (
    <p className="flex items-center gap-3 text-sm">
      <span className="font-board rounded-sm bg-kauri px-2 py-0.5 text-base text-signal">Episode {episode.number}</span>
      {episode.topic ? <span className="font-semibold text-fern-dark">{TOPIC_LABEL[episode.topic]}</span> : null}
    </p>
  )
}

export function FeaturedEpisode({ episode }: { episode: PodcastEpisode }) {
  return (
    <a
      href={episode.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid items-center gap-6 lg:grid-cols-12 lg:gap-12"
    >
      <Img
        name={episode.thumbnail}
        alt=""
        sizes="(min-width: 1024px) 560px, 100vw"
        className="aspect-square w-full rounded-photo object-cover lg:col-span-5"
      />
      <div className="lg:col-span-7">
        <EpisodeTag episode={episode} />
        <h3 className="font-display mt-4 text-[clamp(1.5rem,3.4vw,2.5rem)] group-hover:text-fern-dark">{episode.title}</h3>
        <p className="mt-5 inline-flex items-center gap-2 font-semibold text-fern underline decoration-2 underline-offset-4">
          Listen to episode {episode.number}
          <span className="sr-only"> (opens in a new tab)</span>
          <ExternalLink aria-hidden="true" className="size-4" />
        </p>
      </div>
    </a>
  )
}

export function EpisodeRow({ episode }: { episode: PodcastEpisode }) {
  return (
    <li>
      <a href={episode.href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[6rem_1fr] items-center gap-4 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
        <Img
          name={episode.thumbnail}
          alt=""
          sizes="128px"
          className="aspect-square w-full rounded-card object-cover"
        />
        <div>
          <EpisodeTag episode={episode} />
          <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-fern-dark group-hover:underline sm:text-xl">
            {episode.title}
            <span className="sr-only"> (opens in a new tab)</span>
            <ExternalLink aria-hidden="true" className="ml-2 inline size-4 align-[-0.1em] text-fern" />
          </h3>
        </div>
      </a>
    </li>
  )
}
