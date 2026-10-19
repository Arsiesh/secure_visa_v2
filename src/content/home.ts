// Home page copy that is not covered by another content module. Verbatim from pages/home.md.

import { brand } from './site'

export const homeHero = {
  headline: brand.heroHeadline,
  lead: brand.tagline,
  video: { label: 'Watch the free 40-min video', href: 'https://study.securevisa.com/nz' },
  videoNote: 'If you want to know how get your residence visa in New Zealand, click the button below.',
} as const

export const homeSituation = {
  heading: 'Whatever your current situation, we can help you get your student visa approved',
  lines: [
    { q: 'Confused & too much information?', a: 'No problem!' },
    { q: 'Don’t know where and how to start?', a: 'No worries!' },
    { q: 'You have no time to research complicated process?', a: 'We can help!' },
  ],
  body: 'We have a team of immigration consultants that tailors our proven process around you and your unique situation.',
} as const

export const homeSpecialists = {
  heading: 'You need professional specialists that work with immigration consultants to secure a student permit for your unique situation.',
  body: [
    'We do not guarantee you miracle cures or instant success. Emigrating to a new country and gaining student permit as a stepping stone to obtain permanent residency requires hard work.',
    'What we promise is to be by your family’s side each step of the way, not just preparing for your new life… but long after you land and settle in. Remember, we’ve been through this process ourselves. We know how exciting yet terrifying it is and how lonely it can feel when you find yourself thousands of miles from home.',
    'That’s why we have immigration consultants like no other. We not only have a proven 3-step process that we’ll tailor around your unique situation but we know what it feels like to be in your shoes. If you have a dream like we did to start a new life in an exciting and vibrant country… we can help.',
  ],
  image: 'hp-update-02.webp',
} as const

export const homeProof = {
  heading: 'We’ve helped dozens of families gain immigration and citizenship',
  headingAlt: 'We’ve helped hundreds of people start their immigration & fulfill their dreams',
  cta: { label: 'Watch our free 60-min video to see how we can help you do the same', href: 'https://study.securevisa.com/now/' },
} as const

export const homePodcast = {
  heading: 'The Secure Visa podcast',
  body: 'Listen as we interview former international students, emigration lawyers, and those who know the ins and outs of how to immigrate and gain permanent residency in Canada and New Zealand!',
  cta: { label: 'View episodes', href: '/podcast/' },
  subscribe: 'Subscribe now',
} as const

/** The repeated closing call to action, as it appears on the home, About, Team and Connect pages. */
export const closingCta = {
  heading: 'We can help you transform your dream life into a reality through our proven process!',
  body: [
    'We’ve already helped dozens of families gain permanent residency in countries like Canada and New Zealand. We can help your family do the same!',
    'We work with expert partners to tailor our proven process around you and your family’s needs. And we stay by your side each step of the way — including after you arrive and build your new life.',
    'If you’d like to work with an immigration consultant that cares about your future, attend our presentation to discover your next steps.',
  ],
  image: 'about-image.webp',
  imageAlt: 'A tablet showing “Proven Process! by Jan & Aina” beside a photo of Jan and Aina Sacdalan',
} as const
