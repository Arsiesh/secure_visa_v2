import { CalendarCheck } from 'lucide-react'
import { ProcessJourney } from '../components/process/ProcessJourney'
import { SupportTabs } from '../components/process/SupportTabs'
import { Container } from '../components/Container'
import { CtaBand } from '../components/CtaBand'
import { FeaturedIn } from '../components/FeaturedIn'
import { Img } from '../components/Img'
import { processCta, processFootnote, processIntro } from '../content/process'

export default function ProcessPage() {
  return (
    <>
      <title>Our process | Secure Visa</title>
      <meta
        name="description"
        content="Our proven five-step process, with support before you fly, when you land and after you settle, so you and your family are looked after at every step."
      />
      <section className="on-dark overflow-hidden bg-kauri text-white">
        <Container className="grid items-end gap-x-10 lg:grid-cols-12">
          <div className="py-14 lg:col-span-7 lg:py-24">
            <h1 className="font-display max-w-[16ch] text-[clamp(2.5rem,6vw,4.75rem)]">{processIntro.title}</h1>
            <p className="mt-6 max-w-[48ch] text-[clamp(1.0625rem,1.8vw,1.3125rem)] leading-relaxed text-white/85">
              {processIntro.body.charAt(0).toUpperCase() + processIntro.body.slice(1)}
            </p>
          </div>
          <div className="lg:col-span-5">
            <Img
              name="process-mobile-image.webp"
              alt="Jan and Aina Sacdalan smiling, holding a book"
              priority
              sizes="(min-width: 1024px) 480px, 80vw"
              className="mx-auto -mt-4 block h-auto w-full max-w-sm lg:max-w-none"
            />
          </div>
        </Container>
      </section>

      <ProcessJourney />

      <section aria-label="More detail" className="bg-paper">
        <Container size="narrow" className="pb-16 lg:pb-24">
          <p className="max-w-[62ch] border-l-4 border-fern pl-5 text-lg leading-relaxed">
            {processFootnote.before} (
            <a href={processFootnote.linkHref} className="font-semibold text-fern underline underline-offset-4 hover:text-fern-dark">
              {processFootnote.linkLabel}
              <span className="sr-only"> the free online presentation</span>
            </a>
            ) {processFootnote.after}
          </p>
        </Container>
      </section>

      <SupportTabs />

      <CtaBand
        heading={processCta.heading}
        body={[processCta.body]}
        label={processCta.label}
        href={processCta.href}
        icon={CalendarCheck}
      />
      <FeaturedIn />
    </>
  )
}
