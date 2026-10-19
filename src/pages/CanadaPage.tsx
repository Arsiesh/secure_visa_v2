import { DestinationTemplate } from '../components/destination/DestinationTemplate'
import { canada } from '../content/destinations'

export default function CanadaPage() {
  return (
    <DestinationTemplate
      dest={canada}
      description="Emigrate to Canada and gain permanent residency with Secure Visa, even if you don’t have a job offer or are not a highly skilled professional. Watch our free 60-minute video."
    />
  )
}
