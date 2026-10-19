import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'

/** Shown inside the layout when a route fails to load, for example when the network drops during a lazy import. */
export default function RouteErrorPage() {
  return (
    <Container size="narrow" className="py-24 lg:py-32">
      <title>This page didn’t load | Secure Visa</title>
      <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)]">This page didn’t load</h1>
      <p className="mt-5 max-w-[52ch] text-lg text-ink-muted">
        Check your connection and try again. Your progress on other pages is not lost.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-fern px-6 py-2.5 text-center text-[1.0625rem] font-semibold leading-tight text-white transition-[color,background-color,border-color,transform] duration-200 hover:bg-fern-dark focus-visible:outline-offset-4 active:scale-[0.98] motion-reduce:active:scale-100"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="secondary">
          Back to the home page
        </ButtonLink>
      </div>
    </Container>
  )
}
