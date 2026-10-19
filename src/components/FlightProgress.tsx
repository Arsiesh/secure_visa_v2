import { Plane } from 'lucide-react'
import { Container } from './Container'

/**
 * Page-scroll progress drawn as a flight: a 2px line under the sticky header fills left to right while a plane
 * travels from MNL to the destination. Pure CSS scroll-driven animation (see `.flight-progress` in index.css),
 * so there are no scroll listeners; browsers without `animation-timeline` render nothing.
 * The airport codes sit on the Container gutters, so they line up with the page content.
 */
export function FlightProgress({ to }: { to: string }) {
  return (
    <div aria-hidden="true" className="flight-progress">
      <div className="flight-progress__box">
        <div className="flight-progress__line">
          <div className="flight-progress__fill" />
        </div>
        <Container size="wide" className="flight-progress__gutter">
          <div className="flight-progress__track">
            <span className="flight-progress__code font-board flight-progress__code--from">MNL</span>
            <span className="flight-progress__code font-board flight-progress__code--to">{to}</span>
            <div className="flight-progress__plane">
              <Plane />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
