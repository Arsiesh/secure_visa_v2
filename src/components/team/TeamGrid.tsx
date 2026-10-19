import { useState } from 'react'
import { team, type TeamMember } from '../../content/team'
import { Img } from '../Img'
import { TeamDialog } from './TeamDialog'

/** Portraits with name and role underneath. Each opens the full bio in a dialog. */
export function TeamGrid() {
  const [selected, setSelected] = useState<TeamMember | null>(null)
  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
        {team.map((member) => (
          <li key={member.id}>
            <button
              type="button"
              onClick={() => setSelected(member)}
              aria-haspopup="dialog"
              className="group block w-full text-left focus-visible:outline-offset-4"
            >
              {member.photo ? (
                <span className="block overflow-hidden rounded-photo bg-mist">
                  <Img
                    name={member.photo}
                    alt={member.alt}
                    sizes="(min-width: 1024px) 300px, 45vw"
                    className="aspect-[4/5] w-full object-cover object-[50%_15%] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
              ) : null}
              <span className="font-display mt-4 block text-lg leading-tight sm:text-xl">{member.name}</span>
              <span className="mt-1 block text-[0.9375rem] leading-snug text-ink-muted">{member.role}</span>
              <span className="mt-2 inline-block text-[0.9375rem] font-semibold text-fern underline decoration-2 underline-offset-4">
                Read bio
              </span>
            </button>
          </li>
        ))}
      </ul>
      {selected ? <TeamDialog key={selected.id} member={selected} onClose={() => setSelected(null)} /> : null}
    </>
  )
}
