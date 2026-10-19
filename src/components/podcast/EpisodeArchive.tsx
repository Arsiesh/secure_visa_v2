import { useDeferredValue, useId, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import clsx from 'clsx'
import { episodes, type PodcastTopic } from '../../content/podcast'
import { EpisodeRow } from './EpisodeRow'

type Filter = 'all' | PodcastTopic

const FILTERS: { value: Filter; label: string; count: number }[] = [
  { value: 'all', label: 'All', count: episodes.length },
  { value: 'canada', label: 'Canada', count: episodes.filter((e) => e.topics.includes('canada')).length },
  { value: 'new-zealand', label: 'New Zealand', count: episodes.filter((e) => e.topics.includes('new-zealand')).length },
]

// Search text is built once per episode: title plus show notes.
const searchable = new Map(episodes.map((e) => [e.number, `${e.title}\n${e.notes.join('\n')}`.toLowerCase()]))
const newest = episodes[0]

/** Filter chips, title and show-notes search, and the list of every episode, newest first. */
export function EpisodeArchive() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const searchRef = useRef<HTMLInputElement>(null)
  const searchId = useId()

  const term = deferredQuery.trim().toLowerCase()
  const results = useMemo(
    () =>
      episodes.filter(
        (e) => (filter === 'all' || e.topics.includes(filter)) && (term === '' || searchable.get(e.number)!.includes(term)),
      ),
    [filter, term],
  )

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <fieldset className="min-w-0">
          <legend className="mb-3 font-semibold">Show episodes about</legend>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <label key={f.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="podcast-topic"
                  value={f.value}
                  checked={filter === f.value}
                  onChange={() => setFilter(f.value)}
                  className="peer sr-only"
                />
                <span
                  className={clsx(
                    'inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 font-semibold transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-fern motion-reduce:transition-none',
                    filter === f.value
                      ? 'border-kauri bg-kauri text-white'
                      : 'border-line-strong bg-white text-ink hover:border-kauri',
                  )}
                >
                  <span>
                    {f.label}
                    <span className="sr-only">, {f.count} episodes</span>
                  </span>
                  <span aria-hidden="true" className="tabular-nums opacity-80">
                    {f.count}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="lg:w-96">
          <label htmlFor={searchId} className="mb-3 block font-semibold">
            Search episodes
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
            <input
              ref={searchRef}
              id={searchId}
              type="search"
              autoComplete="off"
              enterKeyHint="search"
              placeholder="Search by title or show notes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-12 w-full rounded-input border-2 border-line-strong bg-white pl-11 pr-3 text-ink placeholder:text-ink-muted"
            />
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-[0.9375rem] text-ink-muted">
        Showing {results.length} {results.length === 1 ? 'episode' : 'episodes'}
      </p>

      {results.length > 0 ? (
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {results.map((episode) => (
            <EpisodeRow key={episode.number} episode={episode} featured={episode.number === newest.number} />
          ))}
        </ul>
      ) : (
        <div className="mt-3 rounded-card bg-mist p-6 sm:p-8">
          <p className="text-lg font-semibold">No episodes match “{deferredQuery.trim()}”.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              searchRef.current?.focus()
            }}
            className="mt-4 inline-flex min-h-12 items-center rounded-full border-2 border-fern px-6 font-semibold text-fern hover:bg-fern hover:text-white"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  )
}
