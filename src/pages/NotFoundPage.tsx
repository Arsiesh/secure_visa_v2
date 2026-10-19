import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'

export default function NotFoundPage() {
  return (
    <>
      <title>Page not found | Secure Visa</title>
      <meta name="robots" content="noindex" />
      <section className="on-dark bg-kauri text-white">
        <Container size="narrow" className="py-20 lg:py-32">
          <p className="font-board inline-block rounded-input bg-kauri-2 px-4 py-2 text-[clamp(1.75rem,5vw,3rem)] leading-none tracking-[0.12em] text-signal">
            FLIGHT NOT FOUND
          </p>
          <h1 className="font-display mt-8 text-[clamp(2rem,5vw,3.5rem)]">We can’t find that page</h1>
          <p className="mt-5 max-w-[52ch] text-lg text-white/85">
            The link may be old or mistyped. Head back to the start, pick a destination, or talk to us and we’ll point
            you the right way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/" variant="onDark">Home</ButtonLink>
            <ButtonLink href="/new-zealand-services/" variant="ghost">New Zealand</ButtonLink>
            <ButtonLink href="/canada-services/" variant="ghost">Canada</ButtonLink>
            <ButtonLink href="/connect/" variant="ghost">Connect</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
