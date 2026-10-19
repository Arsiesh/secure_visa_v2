import { memo, useEffect, useState } from 'react'

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
/** Time between flips of one cell. Each flip is a 60ms fall plus a 60ms settle. */
export const FLIP_STEP = 120

type CellState = { cur: string; prev: string; n: number }

type Props = {
  char: string
  /** Delay before this cell starts flipping, in ms. Only used when `animate` is true on mount. */
  delay: number
  /** Number of random characters to pass through before settling. */
  flips: number
  /** Run the flip sequence on mount. Later changes to this prop are ignored on purpose. */
  animate: boolean
}

/** One character cell. Local state, so a flip re-renders this cell and nothing else. */
export const SplitFlapCell = memo(function SplitFlapCell({ char, delay, flips, animate }: Props) {
  const [s, setS] = useState<CellState>(() => ({ cur: animate && char !== ' ' ? ' ' : char, prev: ' ', n: 0 }))

  useEffect(() => {
    if (!animate || char === ' ') return
    const timers: number[] = []
    const seq: string[] = []
    for (let i = 0; i < flips; i++) seq.push(POOL[Math.floor(Math.random() * POOL.length)])
    seq.push(char)
    seq.forEach((c, i) => {
      timers.push(window.setTimeout(() => setS((p) => ({ cur: c, prev: p.cur, n: p.n + 1 })), delay + i * FLIP_STEP))
    })
    return () => timers.forEach(window.clearTimeout)
    // The sequence is a one-off on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const flipping = s.n > 0
  return (
    <span className="flap-cell" aria-hidden="true">
      <span className="flap-half flap-top">
        <span>{s.cur}</span>
      </span>
      <span className="flap-half flap-bottom">
        <span>{flipping ? s.prev : s.cur}</span>
      </span>
      {flipping ? (
        <>
          <span key={`t${s.n}`} className="flap-half flap-top flap-top-anim">
            <span>{s.prev}</span>
          </span>
          <span key={`b${s.n}`} className="flap-half flap-bottom flap-bottom-anim">
            <span>{s.cur}</span>
          </span>
        </>
      ) : null}
      <span className="flap-split" />
    </span>
  )
})
