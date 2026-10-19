import type { LongTestimonial } from '../../content/testimonials'

const place = { nz: 'Moving to New Zealand', canada: 'Moving to Canada' } as const

export function Letters({ letters }: { letters: readonly LongTestimonial[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {letters.map((letter) => (
        <figure key={letter.id} className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <figcaption className="lg:col-span-3">
            <p className="font-semibold text-ink">{letter.attribution}</p>
            <p className="mt-1 text-ink-muted">{place[letter.destination]}</p>
          </figcaption>
          <blockquote className="lg:col-span-9">
            <p className="font-display max-w-[30ch] text-[clamp(1.5rem,2.8vw,2.25rem)] !font-bold !leading-[1.15]">
              “{letter.headline}”
            </p>
            <p className="mt-6 max-w-[68ch] text-lg text-ink-muted">{letter.body}</p>
          </blockquote>
        </figure>
      ))}
    </div>
  )
}
