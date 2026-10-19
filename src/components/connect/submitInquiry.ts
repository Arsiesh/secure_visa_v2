import { contact } from '../../content/site'

export type InquiryData = {
  name: string
  email: string
  phone: string
  inquiry: string
  message: string
}

/** 'sent': delivered to our team. 'handed-off': only passed to the visitor's email app, who must still tap Send. */
export type SubmitResult = 'sent' | 'handed-off'

export type FieldKey = 'name' | 'email' | 'phone'
type Errors = Partial<Record<FieldKey, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE = /^\+?[0-9\s().-]{7,}$/

/** Inline error messages by field. An empty object means the form can be sent. */
export function validate(v: InquiryData): Errors {
  const errors: Errors = {}
  if (!v.name.trim()) errors.name = 'Enter your name, so we know who to reply to'
  if (!v.email.trim()) errors.email = 'Enter your email address, like name@example.com'
  else if (!EMAIL.test(v.email.trim())) errors.email = 'Check your email address. It should look like name@example.com'
  if (v.phone.trim() && !PHONE.test(v.phone.trim())) {
    errors.phone = 'Check your phone number. Include your country code, for example +63 968 888 0805'
  }
  return errors
}

export function composeInquiry(data: InquiryData) {
  const inquiry = data.inquiry || 'Other inquiries'
  const subject = `Website inquiry: ${inquiry}`
  const body = [
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim() || 'Not given'}`,
    `Inquiry: ${inquiry}`,
    '',
    data.message.trim() || '(No message)',
  ].join('\r\n')
  return { subject, body }
}

export function buildMailto(data: InquiryData) {
  const { subject, body } = composeInquiry(data)
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function openMailto(data: InquiryData) {
  window.location.assign(buildMailto(data))
}

/**
 * The single place a submission leaves the site.
 *
 * TODO(backend): to deliver messages for real, POST `data` to the client's endpoint here
 * (form service, serverless function or CRM), and return 'sent' only when the response is ok.
 * On failure, fall through to the mailto hand-off below. The UI already handles both results.
 */
export async function submitInquiry(data: InquiryData): Promise<SubmitResult> {
  openMailto(data)
  return 'handed-off'
}
