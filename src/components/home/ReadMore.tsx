import { useId, type ReactNode } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

type ReadMoreProps = {
  expanded: boolean
  onToggle: () => void
  label: string
  children: ReactNode
  className?: string
}

/** Phones only: the content collapses (grid rows 0fr to 1fr) behind a button. From md up it is always open and the button is gone. */
export function ReadMore({ expanded, onToggle, label, children, className }: ReadMoreProps) {
  const id = useId()
  return (
    <div className={className}>
      <div
        id={id}
        className={clsx(
          'grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none md:grid-rows-[1fr]',
          expanded ? 'grid-rows-[1fr]' : 'invisible grid-rows-[0fr] md:visible',
        )}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={id}
        className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-fern underline underline-offset-4 hover:text-kauri md:hidden"
      >
        {expanded ? 'Show less' : label}
        <ChevronDown aria-hidden="true" className={clsx('size-5 transition-transform motion-reduce:transition-none', expanded && 'rotate-180')} />
      </button>
    </div>
  )
}
