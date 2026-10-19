import { useSearchParams } from 'react-router-dom'
import { ContactForm, type FormValues } from '../components/connect/ContactForm'
import { ContactPanel } from '../components/connect/ContactPanel'
import { Container } from '../components/Container'
import { CtaBand } from '../components/CtaBand'
import { inquiries } from '../content/connect-extra'

const PARTY_MESSAGE: Record<string, string> = {
  solo: 'I’m planning to move on my own.',
  partner: 'I’m planning to move with my partner.',
  family: 'I’m planning to move with my family.',
}

function initialValues(params: URLSearchParams): FormValues {
  const destination = params.get('destination')
  let inquiry = ''
  if (destination === 'nz') inquiry = inquiries[1]
  else if (destination === 'canada') inquiry = inquiries[0]
  if (params.get('nurse') === '1') inquiry = inquiries[2]
  return { name: '', email: '', phone: '', inquiry, message: PARTY_MESSAGE[params.get('party') ?? ''] ?? '' }
}

export default function ConnectPage() {
  const [params] = useSearchParams()

  return (
    <>
      <title>Connect with us | Secure Visa</title>
      <meta
        name="description"
        content="Have a question? Contact Secure Visa by email, phone or the form, or visit our Makati and Auckland Airport offices."
      />
      <section className="on-dark bg-kauri text-white">
        <Container className="py-10 lg:py-14">
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)]">Have a question? Contact us.</h1>
        </Container>
      </section>

      <section className="py-12 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm initial={initialValues(params)} />
          </div>
          <div className="lg:col-span-5">
            <ContactPanel />
          </div>
        </Container>
      </section>

      <CtaBand label="Access the free presentation" href="https://migrate.securevisa.com/nz-webinar" />
    </>
  )
}
