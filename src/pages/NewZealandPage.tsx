import { DestinationTemplate } from '../components/destination/DestinationTemplate'
import { newZealand } from '../content/destinations'

export default function NewZealandPage() {
  return (
    <DestinationTemplate
      dest={newZealand}
      description="Emigrate to New Zealand and gain permanent residency with Secure Visa, even if you don’t have a job offer or are not a highly skilled professional. Start with our free webinar."
    />
  )
}
