import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'

/** Shown inside the layout when a route fails to load, for example when the network drops during a lazy import. */
export default function RouteErrorPage() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return (
    <Container size="narrow" className="py-24 lg:py-32">
      <title>{notFound ? 'Page not found | Secure Visa' : 'This page didn’t load | Secure Visa'}</title>
      <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)]">
        {notFound ? 'We can’t find that page' : 'This page didn’t load'}
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg text-ink-muted">
        {notFound ? 'The link may be old or mistyped.' : 'Check your connection and try again. Your progress on other pages is not lost.'}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to the home page</ButtonLink>
      </div>
    </Container>
  )
}
