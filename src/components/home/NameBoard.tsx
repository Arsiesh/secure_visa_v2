import { useId, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SplitFlapCell } from './SplitFlapCell'
import './board.css'

const NAME_CELLS = 12
const STATUS = 'EXPECTED'
const MAX_LENGTH = 40
const TARGET = '/connect/?intent=assessment'

/** Board characters only: uppercase, accents stripped, A-Z 0-9 space hyphen. */
function toBoard(raw: string) {
  return raw
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toUpperCase()
    .replace(/[^A-Z0-9 -]/g, '')
    .replace(/^ +/, '')
    .slice(0, NAME_CELLS)
}

const EMPTY = '-'.repeat(NAME_CELLS)
const STATUS_CHARS = Array.from(STATUS)

const buttonClass =
  'inline-flex min-h-12 items-center justify-center rounded-full bg-signal px-6 py-2.5 text-center text-[1.0625rem] font-semibold leading-tight text-kauri transition-colors duration-200 hover:bg-white focus-visible:outline-offset-4 focus-visible:outline-signal'

/**
 * The visitor puts their own name on the board. The board is decorative; the input is the accessible control.
 * The name travels to Connect in router location state, never in the URL.
 */
export function NameBoard() {
  const inputId = useId()
  const navigate = useNavigate()
  const [name, setName] = useState('')

  const trimmed = name.trim()
  const board = toBoard(name)
  const empty = board.trim() === ''
  const cells = Array.from((empty ? EMPTY : board).padEnd(NAME_CELLS, ' '))
  const state = trimmed ? { name: trimmed } : undefined

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (trimmed) navigate(TARGET, { state })
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-[34rem]">
      <div aria-hidden="true" className="board-wrap mb-5">
        <div className={`board board-name rounded-card px-5 py-3.5 ring-1 ring-white/10${empty ? ' name-empty' : ''}`}>
          <div className="board-row board-row-static board-row-family name-cols font-board leading-none">
            <span className="board-group">
              {cells.map((ch, i) => (
                <SplitFlapCell key={i} char={ch} delay={0} flips={0} animate={false} flipOnChange calmBlanks />
              ))}
            </span>
            <span className="board-group family-status">
              {STATUS_CHARS.map((ch, i) => (
                <SplitFlapCell key={i} char={ch} delay={0} flips={0} animate={false} />
              ))}
            </span>
          </div>
        </div>
      </div>
      <label htmlFor={inputId} className="mb-2 block text-[1.0625rem] font-semibold">
        Put your name on the board
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="text"
          name="given-name"
          autoComplete="given-name"
          enterKeyHint="go"
          maxLength={MAX_LENGTH}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          className="block min-h-12 w-full min-w-0 rounded-input border-2 border-white/60 bg-white px-4 py-2.5 text-ink placeholder:text-ink-muted/70 sm:flex-1"
        />
        <Link to={TARGET} state={state} className={buttonClass}>
          Book a free assessment
        </Link>
      </div>
    </form>
  )
}
