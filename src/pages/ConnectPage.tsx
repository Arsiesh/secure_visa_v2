import { Mail, Phone } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { CheckInPass } from '../components/connect/CheckInPass'
import { ContactForm, type FormSnapshot, type FormValues } from '../components/connect/ContactForm'
import { ContactPanel } from '../components/connect/ContactPanel'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { CtaBand } from '../components/CtaBand'
import { inquiries } from '../content/connect-extra'
import { contact } from '../content/site'

const PARTY_MESSAGE: Record<string, string> = {
  solo: 'I’m planning to move on my own.',
  partner: 'I’m planning to move with my partner.',
  family: 'I’m planning to move with my family.',
}

/** A name handed over from the home page in router state. Anything that is not a short string is ignored. */
function nameFromState(state: unknown) {
  const raw = (state as { name?: unknown } | null)?.name
  if (typeof raw !== 'string') return ''
  const name = raw.trim()
  return name.length > 0 && name.length <= 60 ? name : ''
}

function initialValues(params: URLSearchParams, name: string): FormValues {
  const destination = params.get('destination')
  const party = params.get('party') ?? ''
  let inquiry = ''
  if (destination === 'nz') inquiry = inquiries[1]
  else if (destination === 'canada') inquiry = inquiries[0]
  // The nurse pathway is a New Zealand one, so it never overrides an explicit Canada choice.
  if (params.get('nurse') === '1' && destination !== 'canada') inquiry = inquiries[2]
  const message = Object.hasOwn(PARTY_MESSAGE, party) ? PARTY_MESSAGE[party] : ''
  return { name, email: '', phone: '', inquiry, message }
}

const STEPS = [
  'Send us your details',
  'We get in touch to arrange your free Student Eligibility Accelerator Assessment',
  'We talk through your options with you',
]

function isAssessment(params: URLSearchParams) {
  return ['destination', 'party', 'nurse'].some((k) => params.has(k)) || params.get('intent') === 'assessment'
}

function FormAndPass({ initial, assessment }: { initial: FormValues; assessment: boolean }) {
  const [snap, setSnap] = useState<FormSnapshot>({ values: initial, valid: false, result: null })
  const onChange = useCallback((next: FormSnapshot) => setSnap(next), [])
  const pass = (className?: string) => (
    <CheckInPass
      name={snap.values.name}
      inquiry={snap.values.inquiry}
      assessment={assessment}
      valid={snap.valid}
      result={snap.result}
      className={className}
    />
  )
  return (
    <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <div className="mb-8 rounded-card bg-mist p-4 lg:hidden">
          <p className="mb-3 font-semibold">Prefer to talk?</p>
          <div className="flex gap-3">
            <ButtonLink href={contact.phoneHref} variant="secondary" icon={Phone} className="flex-1 !px-4">
              Call
            </ButtonLink>
            <ButtonLink href={contact.emailHref} variant="secondary" icon={Mail} className="flex-1 !px-4">
              Email
            </ButtonLink>
          </div>
        </div>
        <ContactForm initial={initial} onChange={onChange} />
        {/* Below lg the pass only appears with the confirmation, so it never pushes the form down. */}
        {snap.result ? <div className="mt-8 lg:hidden">{pass()}</div> : null}
      </div>
      <div className="lg:col-span-5">
        <div className="hidden lg:mb-10 lg:block">{pass()}</div>
        <ContactPanel />
      </div>
    </Container>
  )
}

export default function ConnectPage() {
  const [params] = useSearchParams()
  const { state } = useLocation()
  const assessment = isAssessment(params)

  return (
    <>
      <title>Connect with us | Secure Visa</title>
      <meta
        name="description"
        content="Have a question? Contact Secure Visa by email, phone or the form, or visit our Makati and Auckland Airport offices."
      />
      <section className="on-dark bg-kauri text-white">
        <Container className="py-10 lg:py-14">
          {assessment ? (
            <>
              <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)]">Book your free assessment</h1>
              <p className="mt-4 max-w-[52ch] text-lg text-white/90">
                Unlike many immigration consultants, we don’t charge you a fee just to speak to us.
              </p>
              <ol aria-label="What happens next" className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-8">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-signal font-bold text-kauri"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5 leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)]">Have a question? Contact us.</h1>
          )}
        </Container>
      </section>

      <section className="py-12 lg:py-20">
        <FormAndPass initial={initialValues(params, nameFromState(state))} assessment={assessment} />
      </section>

      <CtaBand label="Access the free presentation" href="https://migrate.securevisa.com/nz-webinar" />
    </>
  )
}
