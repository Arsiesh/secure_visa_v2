// New Zealand and Canada page copy, structured from pages/new-zealand-services.md and pages/canada-services.md.
// Client letters for each destination live in testimonials.ts (longTestimonials, filtered by `destination`).

export type Cta = { label: string; href: string }

export type Destination = {
  slug: 'nz' | 'canada'
  name: string
  path: string
  /** Airport code used on the boarding pass. */
  airport: 'AKL' | 'YYZ'
  hero: {
    title: string
    subtitle: string
    lead: string
    background: string
    mobileImage?: string
    ctas: Cta[]
  }
  intro: string[]
  promise: { heading: string; lead: string; items: string[]; images: { src: string; alt: string }[] }
  remain: { heading: string; body: string[]; cta: Cta }
  presentation: {
    lead: string
    heading: string
    intro: string
    bullets: string[]
    closing: string[]
    cta: Cta
    image: { src: string; alt: string }
    sideImage: { src: string; alt: string }
  }
  finalCta: Cta
}

export const newZealand: Destination = {
  slug: 'nz',
  name: 'New Zealand',
  path: '/new-zealand-services/',
  airport: 'AKL',
  hero: {
    title: 'Emigrate to New Zealand',
    subtitle: 'even if you don’t have a job offer or are not a highly skilled professional!',
    lead: 'Keep scrolling if you’d like to learn how we can help you emigrate and gain permanent residency in New Zealand through our simple, proven process.',
    background: 'nz-section-1-background.webp',
    mobileImage: 'nz-mobile-section-image.webp',
    ctas: [
      { label: 'Register for our free NZ webinar', href: 'https://study.securevisa.com/nz-webinar/' },
      { label: 'Watch the free video presentation', href: 'https://study.securevisa.com/now/' },
    ],
  },
  intro: [
    'Okay…so you have a dream to emigrate to a new country and give your family the opportunities you never had growing up….',
    'You think New Zealand might be the country for you, BUT you already feel overwhelmed (and you haven’t even started!).',
    'Don’t worry. Not long ago, we were in your shoes. We had a dream, but we had no idea how to achieve it. Emigrating seemed complex and expensive, and gaining permanent residency in a beautiful country like New Zealand felt impossible.',
    'Yet here we are…full residents of New Zealand.',
    'The exciting part is that we’ve helped dozens of other families do the same, guiding them through our proven process and working with expert immigration advisors experienced in New Zealand entry laws, residency rules, and so much more.',
    'We know the steps you need to take, how to take them, and when you should. We don’t promise miracles, and we don’t pretend that moving to a new country is easy. But with our proven process, we can make the whole journey easier and more affordable for you.',
  ],
  promise: {
    heading: 'You have a unique situation, and you need an immigration consultant that knows how to help you and your family!',
    lead: 'Our promise is to be by your family’s side along each step of the journey:',
    items: [
      'Helping you decide if New Zealand is the right country for you',
      'Preparing and planning your application',
      'Creating your application and submitting it',
      'And helping you settle into your new home and adjusting to the culture',
    ],
    images: [
      { src: 'canada-image-1.webp', alt: '' },
      { src: 'canada-image-2.webp', alt: '' },
    ],
  },
  remain: {
    heading: 'We remain by your side at all times!',
    body: [
      'Remember, we’ve been through this process. We know how exciting it is but also how overwhelming it can get (not to mention the fear of being so far away from the rest of your family).',
      'When you work with us, you become part of our family. We then work with your family to help achieve your dream life.',
    ],
    cta: { label: 'Register for our free NZ webinar', href: 'https://study.securevisa.com/nz-webinar/' },
  },
  presentation: {
    lead: 'Attend our',
    heading: 'Free online presentation now!',
    intro:
      'Unlike many immigration consultants, we don’t charge you a fee just to speak to us. We work with you from the very beginning, and that starts by attending our free presentation, where we show you:',
    bullets: [
      'The “winning ticket” that helped us secure permanent residency.',
      'Our personal horror story after working with an incompetent immigration consultant and the “important lesson” we learned the hard way.',
      'The investment you need to move to New Zealand and how soon you can get a “positive ROI”.',
      'How to get a job in New Zealand and how you can work and build a “successful career”.',
      'The winning stories from some of our clients who have used this “winning ticket” to secure a better future for their families.',
    ],
    closing: [
      'Whether you already have a family, have plans for one in the future, or are single and looking to start a new adventure…our proven process can help you emigrate to New Zealand.',
      'Even if you don’t have a job! Even if you don’t have a job offer or anything in the pipeline! Even if you aren’t a highly skilled professional (like an engineer, a nurse, or in IT)!',
      'We’ve helped dozens of families like yours and hundreds of people in your shoes build a new life in an exciting country with endless opportunities. If you would like to learn how we can help or more about the people we have helped, attend our webinar now.',
    ],
    cta: { label: 'Watch the free video presentation', href: 'https://study.securevisa.com/now/' },
    image: { src: 'canada-image-3.webp', alt: '' },
    sideImage: { src: 'canada-image-4.webp', alt: '' },
  },
  finalCta: { label: 'Register for our free NZ webinar', href: 'https://study.securevisa.com/nz-webinar/' },
}

export const canada: Destination = {
  slug: 'canada',
  name: 'Canada',
  path: '/canada-services/',
  airport: 'YYZ',
  hero: {
    title: 'Emigrate to Canada',
    subtitle: 'even if you don’t have a job offer or are not a highly skilled professional!',
    lead: 'Keep scrolling if you’d like to learn how we can help you emigrate and gain permanent residency in Canada through our simple, proven process.',
    background: 'canada-banner.webp',
    mobileImage: 'canada-image.webp',
    ctas: [{ label: 'Watch our free 60-min video', href: 'https://study.securevisa.com/CANADA-PR/' }],
  },
  intro: [
    'Okay…so you have a dream to emigrate to a new country and give your family the opportunities you never had growing up…',
    'You think Canada might be the country for you BUT you already feel overwhelmed (and you haven’t even started)!',
    'Don’t worry. Not long ago, we were in your shoes. We had a dream, but we had no idea how to achieve it. Emigrating seemed complex and expensive, and gaining permanent residency in a beautiful country like Canada felt impossible.',
    'Yet here we are… full residents in a new land.',
    'The exciting part is that we’ve helped dozens of other families do the same, guiding them through our proven process and working with expert immigration advisors experienced in Canadian entry laws, residency rules, and so much more.',
    'We know the steps you need to take, how to take them, and when you should. We don’t promise miracles, and we don’t pretend that moving to a new country is easy. But with our proven process, we can make the whole journey easier and more affordable for you.',
  ],
  promise: {
    heading: 'You have a unique situation, and you need an immigration consultant that knows how to help you and your family!',
    lead: 'Our promise is to be by your family’s side along each step of the journey:',
    items: [
      'Helping you decide if Canada is the right country for you',
      'Preparing and planning your application',
      'Creating your application and submitting it',
      'Helping you settle into your new home and adjusting to the culture',
    ],
    images: [
      { src: 'canada-image-1.webp', alt: '' },
      { src: 'canada-image-2.webp', alt: '' },
    ],
  },
  remain: {
    heading: 'We remain by your side at all times!',
    body: [
      'Remember, we’ve been through this process. We know how exciting it is but also how overwhelming it can get (not to mention the fear of being so far away from the rest of your family).',
      'When you work with us, you become part of our family. We then work with your family to help achieve your dream life.',
    ],
    cta: { label: 'Watch our free 60-min video and see how we can help', href: 'https://study.securevisa.com/CANADA-PR/' },
  },
  presentation: {
    lead: 'Watch our',
    heading: 'Free online presentation now!',
    intro:
      'Unlike many immigration consultants, we don’t charge you a fee just to speak to us. We work with you from the very beginning, and that starts by attending our free presentation where we show you:',
    bullets: [
      'The “winning ticket” that helped us secure permanent residency.',
      'Our personal horror story after working with an incompetent immigration consultant and the “important lesson” we learned the hard way.',
      'The investment you need to move to Canada and how soon you can get a “positive ROI”.',
      'How to get a job in Canada and discover how you can work and build a “successful career”.',
      'The winning story from some of our clients who have used this “winning ticket” to secure a better future for their families.',
    ],
    closing: [
      'Whether you already have a family, have plans for one in the future, or are single and looking to start a new adventure…our proven process can help you migrate to Canada.',
      'Even if you don’t have a job! Even if you don’t have a job offer or anything in the pipeline! Even if you aren’t a highly skilled professional (like an engineer, a nurse, or in IT)!',
      'We’ve helped dozens of families like yours and hundreds of people in your shoes build a new life in an exciting country with endless opportunities. If you would like to learn how we can help or more about the people we have helped already, attend our webinar now.',
    ],
    cta: { label: 'Attend our free webinar now', href: 'https://study.securevisa.com/now/' },
    image: { src: 'canada-image-3.webp', alt: '' },
    sideImage: { src: 'canada-image-4.webp', alt: '' },
  },
  finalCta: { label: 'Watch our free 60-min video', href: 'https://study.securevisa.com/CANADA-PR/' },
}

export const destinations = { nz: newZealand, canada } as const

/** Service cards used on the home page to link to each destination. */
export const serviceCards = [
  { slug: 'nz', label: 'Student visa in New Zealand', href: '/new-zealand-services/', image: 'service-card-new-zealand.webp' },
  { slug: 'canada', label: 'Student visa in Canada', href: '/canada-services/', image: 'service-card-canada.webp' },
] as const
