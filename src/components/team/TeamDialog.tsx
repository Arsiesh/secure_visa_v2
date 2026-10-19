import { useEffect, useId, useRef } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import type { TeamMember } from '../../content/team'
import { Img } from '../Img'
import { useScrollLock } from '../../hooks/useScrollLock'

type TeamDialogProps = { member: TeamMember; onClose: () => void }

/** Native modal dialog: showModal() gives the focus trap, Escape and focus return for free. */
export function TeamDialog({ member, onClose }: TeamDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const reduce = useReducedMotion()
  useScrollLock(true)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) ref.current.close()
      }}
      className="m-auto max-h-[92dvh] w-[min(46rem,calc(100%-1.5rem))] overflow-visible rounded-photo bg-paper p-0 text-ink backdrop:bg-kauri/70"
    >
      <m.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
        className="grid max-h-[92dvh] overflow-y-auto rounded-photo sm:grid-cols-5"
      >
        {member.photo ? (
          <Img
            name={member.photo}
            alt={member.alt}
            className="aspect-[4/3] w-full object-cover object-top sm:col-span-2 sm:aspect-auto sm:h-full"
          />
        ) : null}
        <div className="p-6 sm:col-span-3 sm:p-8">
          <h2 id={titleId} className="font-display pr-12 text-[clamp(1.5rem,3.4vw,2rem)]">
            {member.name}
          </h2>
          <p className="mt-2 font-semibold text-fern-dark">{member.role}</p>
          {member.tagline ? <p className="mt-1 text-ink-muted">{member.tagline}</p> : null}
          <div className="mt-5 flex flex-col gap-4">
            {member.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {member.quote ? (
            <blockquote className="font-display mt-6 border-l-4 border-fern pl-4 text-xl text-fern-dark">
              {member.quote}
            </blockquote>
          ) : null}
        </div>
        <button
          type="button"
          autoFocus
          aria-label="Close"
          onClick={() => ref.current?.close()}
          className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-paper text-ink shadow-sm hover:bg-mist"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </m.div>
    </dialog>
  )
}
