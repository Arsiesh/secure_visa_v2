import { Check } from 'lucide-react'
import { AIRPORTS, LAND_DOTS, ROUTE_ARCS, ROUTE_MAP } from './routeMapData'
import './board.css'

type Dest = 'nz' | 'canada'

const { width: W, height: H, dotStep } = ROUTE_MAP
const pct = (n: number, total: number) => `${((n / total) * 100).toFixed(2)}%`

const DEST_CODE: Record<Dest, 'AKL' | 'YYZ'> = { nz: 'AKL', canada: 'YYZ' }
/** The study's timing: Canada's arc is longer and takes about 1.35x as long. */
const DURATION: Record<Dest, string> = { nz: '1.6s', canada: '2.16s' }

type Props = {
  dest: Dest
  /** True only after the user has changed the destination. The parent remounts this component with a new key to replay. */
  fly: boolean
}

/** Decorative dotted world map with the flight path from Manila. Static unless `fly` is set. */
export function RouteMap({ dest, fly }: Props) {
  const arc = ROUTE_ARCS[dest]
  const mnl = AIRPORTS.MNL
  const end = AIRPORTS[DEST_CODE[dest]]
  const style = { '--len': arc.length, '--dur': DURATION[dest] } as React.CSSProperties

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`relative w-full overflow-hidden rounded-t-card border-b-2 border-dashed border-line bg-white ${fly ? 'route-fly' : ''}`}
    >
      <div style={{ aspectRatio: `${W} / ${H}` }} className="w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="block size-full" fill="none">
          <path
            d={LAND_DOTS}
            stroke="var(--color-line)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeDasharray={`0 ${dotStep}`}
          />
          <defs>
            <mask id="route-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <path d={arc.d} stroke="#fff" strokeWidth="14" strokeLinecap="round" className="route-draw" />
            </mask>
          </defs>
          <path d={arc.d} stroke="var(--color-fern)" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" mask="url(#route-reveal)" />
          <circle cx={end[0]} cy={end[1]} r="12" stroke="var(--color-fern)" strokeWidth="3" className="route-pulse" />
          <circle cx={end[0]} cy={end[1]} r="7" fill="var(--color-fern)" className="route-dest-dot" />
          <circle cx={mnl[0]} cy={mnl[1]} r="7" fill="var(--color-kauri)" />
          <g className="route-plane" style={{ offsetPath: `path('${arc.d}')` }}>
            <path
              transform="translate(-16 -16) scale(1.33)"
              d="M21.5 12c0 .9-.8 1.4-1.8 1.4h-5.2l-4.3 6.6H8.2l2.4-6.6H5.8l-1.5 2.2H2.8l.8-3.6-.8-3.6h1.5l1.5 2.2h4.8L8.2 4h2l4.3 6.6h5.2c1 0 1.8.5 1.8 1.4z"
              fill="var(--color-kauri)"
            />
          </g>
        </svg>
      </div>
      <span
        className="font-board absolute -translate-y-1/2 pl-3 text-[0.8125rem] font-medium leading-none text-kauri min-[400px]:text-[0.875rem] sm:text-[1rem]"
        style={{ left: pct(mnl[0], W), top: pct(mnl[1], H) }}
      >
        MNL
      </span>
      {/* AKL sits to the right of its dot and YYZ below-left, because the landing plane arrives from the upper left. */}
      <span
        className={`font-board absolute text-[0.8125rem] font-medium leading-none text-kauri min-[400px]:text-[0.875rem] sm:text-[1rem] ${
          dest === 'nz' ? '-translate-y-1/2 pl-3.5' : '-translate-x-full pr-2.5 pt-2.5'
        }`}
        style={{ left: pct(end[0], W), top: pct(end[1], H) }}
      >
        {DEST_CODE[dest]}
      </span>
      <p className="font-board absolute bottom-2 right-2 inline-grid rounded-full bg-white/90 px-3 py-1 text-[0.8125rem] leading-none text-ink-muted sm:text-[0.9375rem]">
        <span className="route-en-route col-start-1 row-start-1">EN ROUTE</span>
        <span className="route-landed col-start-1 row-start-1 inline-flex items-center gap-1.5 text-fern">
          <Check className="size-3.5" strokeWidth={3} />
          LANDED
        </span>
      </p>
    </div>
  )
}
