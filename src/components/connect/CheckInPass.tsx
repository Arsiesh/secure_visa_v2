import { Plane } from 'lucide-react'
import clsx from 'clsx'
import { inquiries } from '../../content/connect-extra'
import { SplitFlapCell } from '../home/SplitFlapCell'
import type { SubmitResult } from './submitInquiry'
import '../home/board.css'

const MAX_CHARS = 24

/** NZ and the nurse pathway land in Auckland, Canada in Toronto. Anything else is not chosen yet. */
function destinationCode(inquiry: string) {
  if (inquiry === inquiries[0]) return 'YYZ'
  if (inquiry === inquiries[1] || inquiry === inquiries[2]) return 'AKL'
  return '---'
}

type Props = {
  name: string
  inquiry: string
  assessment: boolean
  valid: boolean
  result: SubmitResult | null
  className?: string
}

function statusLabel(result: SubmitResult | null, valid: boolean) {
  if (result === 'sent') return 'CHECKED IN'
  if (result === 'handed-off') return 'ALMOST THERE'
  return valid ? 'READY' : 'CHECK-IN OPEN'
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="font-board text-[0.8125rem] leading-none text-ink-muted">{label}</p>
      <div className="font-board mt-1.5 text-[1.25rem] leading-none text-kauri">{children}</div>
    </div>
  )
}

function CodeChip({ chars, flip = false }: { chars: string[]; flip?: boolean }) {
  return (
    <span className="board board-code font-board inline-flex rounded-input px-2 py-1.5">
      <span className="board-group">
        {chars.map((ch, i) => (
          <SplitFlapCell key={i} char={ch} delay={0} flips={0} animate={false} flipOnChange={flip} />
        ))}
      </span>
    </span>
  )
}

/**
 * A boarding pass that prints itself as the form is filled. Decorative: everything on it
 * repeats a form field, so it is hidden from assistive tech and the form's own status message speaks.
 */
export function CheckInPass({ name, inquiry, assessment, valid, result, className }: Props) {
  const typed = name.trim()
  const chars = Array.from(typed.length > MAX_CHARS ? `${typed.slice(0, MAX_CHARS - 1)}…` : typed)
  const code = Array.from(destinationCode(inquiry))
  const status = statusLabel(result, valid)

  return (
    <div aria-hidden="true" className={clsx('relative rounded-card border border-line bg-white', className)}>
      <div className="px-6 pb-5 pt-4 sm:px-8">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <p className="font-board text-[0.9375rem] text-fern">Check-in</p>
          <p className="font-board text-[0.9375rem] text-ink-muted">Secure Visa</p>
        </div>
        <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5">
          <p className="font-board text-[0.8125rem] leading-none text-ink-muted">From</p>
          <span />
          <p className="font-board text-[0.8125rem] leading-none text-ink-muted">To</p>
          <CodeChip chars={Array.from('MNL')} />
          <div className="relative flex items-center">
            <span className="h-0 flex-1 border-t-2 border-dashed border-fern/50" />
            <Plane className="mx-1.5 size-6 shrink-0 text-fern" />
            <span className="h-0 flex-1 border-t-2 border-dashed border-fern/50" />
          </div>
          <CodeChip chars={code} flip />
        </div>
        <Field label="Passenger" className="mt-5">
          <p className="h-[1.5rem] overflow-hidden whitespace-nowrap text-[1.5rem]">
            {chars.length === 0 ? (
              <span className="text-ink-muted/60">Your name</span>
            ) : (
              chars.map((ch, i) => (
                <span key={`${i}-${ch}`} className="pass-char">
                  {ch}
                </span>
              ))
            )}
          </p>
        </Field>
      </div>

      <div
        className={clsx(
          'pass-stub relative rounded-b-card border-t-2 border-dashed border-line bg-white px-6 py-4 sm:px-8',
          result === 'sent' && 'pass-stub-torn border-2 border-line shadow-[0_8px_18px_-10px_rgb(0_0_0/0.35)]',
        )}
      >
        <span className="pass-notch pass-notch-l" />
        <span className="pass-notch pass-notch-r" />
        <div className="grid grid-cols-2 gap-x-6">
          <Field label="Class">{assessment ? 'Free assessment' : 'Enquiry'}</Field>
          <Field label="Status">
            <span key={status} className={clsx('inline-block', 'pass-field-in', valid && !result && 'text-fern')}>
              {status}
            </span>
          </Field>
        </div>
      </div>
    </div>
  )
}
