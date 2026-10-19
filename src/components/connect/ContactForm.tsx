import { useRef, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { CircleAlert } from 'lucide-react'
import { inquiries } from '../../content/connect-extra'
import { contact } from '../../content/site'

export type FormValues = {
  name: string
  email: string
  phone: string
  inquiry: string
  message: string
}

type FieldKey = 'name' | 'email' | 'phone'
type Errors = Partial<Record<FieldKey, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?[0-9\s().-]{7,}$/

function validate(v: FormValues): Errors {
  const errors: Errors = {}
  if (!v.name.trim()) errors.name = 'Enter your name, so we know who to reply to'
  if (!v.email.trim()) errors.email = 'Enter your email address, like name@example.com'
  else if (!EMAIL.test(v.email.trim())) errors.email = 'Check your email address. It should look like name@example.com'
  if (v.phone.trim() && !PHONE.test(v.phone.trim())) {
    errors.phone = 'Check your phone number. Include your country code, for example +63 968 888 0805'
  }
  return errors
}

function buildMailto(v: FormValues) {
  const inquiry = v.inquiry || 'Other inquiries'
  const body = [
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Phone: ${v.phone.trim() || 'Not given'}`,
    `Inquiry: ${inquiry}`,
    '',
    v.message.trim() || '(No message)',
  ].join('\r\n')
  return `mailto:${contact.email}?subject=${encodeURIComponent(`Website inquiry: ${inquiry}`)}&body=${encodeURIComponent(body)}`
}

const inputClass =
  'block min-h-12 w-full rounded-input border-2 border-line-strong bg-white px-4 py-2.5 text-ink hover:border-fern placeholder:text-ink-muted/70 aria-[invalid=true]:border-danger'

const fieldOrder: FieldKey[] = ['name', 'email', 'phone']

export function ContactForm({ initial }: { initial: FormValues }) {
  const [values, setValues] = useState<FormValues>(initial)
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const errors = validate(values)
  const visible = (key: FieldKey) => (submitted || touched[key] ? errors[key] : undefined)
  const errorKeys = fieldOrder.filter((k) => errors[k])
  const showSummary = submitted && errorKeys.length > 0

  const set = (key: keyof FormValues) => (event: { target: { value: string } }) =>
    setValues((prev) => ({ ...prev, [key]: event.target.value }))
  const blur = (key: FieldKey) => () => setTouched((prev) => ({ ...prev, [key]: true }))

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    if (errorKeys.length > 0) {
      // The summary mounts on this render; focus it once it exists.
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setSent(true)
    requestAnimationFrame(() => confirmRef.current?.focus())
    window.location.assign(buildMailto(values))
  }

  const reset = () => {
    setValues({ name: '', email: '', phone: '', inquiry: '', message: '' })
    setTouched({})
    setSubmitted(false)
    setSent(false)
    // The form re-mounts on this render; focus Name once it exists.
    requestAnimationFrame(() => nameRef.current?.focus())
  }

  if (sent) {
    return (
      <div ref={confirmRef} tabIndex={-1} role="status" className="rounded-card bg-mist p-6 sm:p-8">
        <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)]">Your message is ready to send</h2>
        <p className="mt-4 max-w-[52ch] text-lg">
          Your email app should open with your message ready to send. If it didn’t, email us at{' '}
          <a href={contact.emailHref} className="font-semibold text-fern underline underline-offset-4">
            {contact.email}
          </a>{' '}
          or call{' '}
          <a href={contact.phoneHref} className="font-semibold text-fern underline underline-offset-4">
            {contact.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-12 items-center rounded-full border-2 border-fern px-6 py-2.5 font-semibold text-fern transition-colors hover:bg-fern hover:text-white"
        >
          Start a new message
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="flex flex-col gap-6">
      {showSummary ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border-2 border-danger bg-white p-5"
        >
          <h2 className="flex items-center gap-2 text-lg font-bold text-danger">
            <CircleAlert aria-hidden="true" className="size-5" />
            Please fix {errorKeys.length === 1 ? 'this' : 'these'} before sending
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            {errorKeys.map((key) => (
              <li key={key}>
                <a href={`#field-${key}`} className="font-semibold text-danger underline underline-offset-4">
                  {errors[key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <label htmlFor="field-name" className="mb-1.5 block font-semibold">
          Name <span className="font-normal text-ink-muted">(required)</span>
        </label>
        <input
          id="field-name"
          ref={nameRef}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={set('name')}
          onBlur={blur('name')}
          aria-invalid={visible('name') ? true : undefined}
          aria-describedby={visible('name') ? 'err-name' : undefined}
          className={inputClass}
        />
        {visible('name') ? <FieldError id="err-name">{errors.name}</FieldError> : null}
      </div>

      <div>
        <label htmlFor="field-email" className="mb-1.5 block font-semibold">
          Email <span className="font-normal text-ink-muted">(required)</span>
        </label>
        <input
          id="field-email"
          name="email"
          type="email"
          spellCheck={false}
          autoComplete="email"
          required
          value={values.email}
          onChange={set('email')}
          onBlur={blur('email')}
          aria-invalid={visible('email') ? true : undefined}
          aria-describedby={visible('email') ? 'err-email' : undefined}
          className={inputClass}
        />
        {visible('email') ? <FieldError id="err-email">{errors.email}</FieldError> : null}
      </div>

      <div>
        <label htmlFor="field-phone" className="mb-1.5 block font-semibold">
          Phone
        </label>
        <input
          id="field-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={set('phone')}
          onBlur={blur('phone')}
          aria-invalid={visible('phone') ? true : undefined}
          aria-describedby={clsx('hint-phone', visible('phone') && 'err-phone')}
          className={inputClass}
        />
        <p id="hint-phone" className="mt-1.5 text-sm text-ink-muted">
          Include your country code, for example +63
        </p>
        {visible('phone') ? <FieldError id="err-phone">{errors.phone}</FieldError> : null}
      </div>

      <fieldset>
        <legend className="mb-2 font-semibold">What is the inquiry about?</legend>
        <div className="flex flex-wrap gap-2.5">
          {inquiries.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="inquiry"
                value={option}
                checked={values.inquiry === option}
                onChange={set('inquiry')}
                className="peer sr-only"
              />
              <span className="block min-h-12 rounded-input border-2 border-line-strong bg-white px-4 py-2.5 leading-snug transition-colors peer-checked:border-fern peer-checked:bg-fern peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-fern hover:border-fern">
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="field-message" className="mb-1.5 block font-semibold">
          Your message
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={set('message')}
          className={inputClass}
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-fern px-8 py-2.5 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-fern-dark"
        >
          Send my message
        </button>
      </div>
    </form>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  )
}
