import './equaliser.css'

/** Three bars that move while an episode plays. Decorative, and hidden entirely under reduced motion. */
export function Equaliser({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`sv-eq inline-flex h-4 items-end gap-0.5 motion-reduce:hidden ${className ?? ''}`}>
      <span className="h-full w-1 rounded-full bg-current" />
      <span className="h-full w-1 rounded-full bg-current" />
      <span className="h-full w-1 rounded-full bg-current" />
    </span>
  )
}
