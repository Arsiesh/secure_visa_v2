// Brand, contact, navigation and trust facts. Copied from content/site.json and the scraped pages.

export type NavLink = { label: string; href: string; description?: string }
export type NavGroup = { label: string; children: NavLink[] }
export type NavItem = NavLink | NavGroup

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'children' in item
}

export const brand = {
  name: 'Secure Visa Consulting, Inc.',
  shortName: 'Secure Visa',
  legalLine: '© 2026 Secure Visa Consulting, Inc.',
  tagline: 'When you join our family, we work with yours until you’re living your dream life in a brand new home.',
  heroHeadline: 'Finally, a team committed to your family’s future.',
  logoHeader: 'logo-secure-visa-header.svg',
  logoFooter: 'logo-secure-visa-footer.svg',
} as const

export const contact = {
  email: 'info@securevisa.com',
  emailHref: 'mailto:info@securevisa.com',
  phone: '+63 968 888 0805',
  phoneHref: 'tel:+639688880805',
} as const

export type Office = { id: 'makati' | 'auckland'; label: string; city: string; lines: string[]; full: string }

export const offices: Office[] = [
  {
    id: 'makati',
    label: 'Main Office',
    city: 'Makati',
    lines: ['21st Floor, 8 Rockwell', 'Hidalgo Drive, Makati City', 'Metro Manila, Philippines 1210'],
    full: '21st Floor, 8 Rockwell, Hidalgo Drive, Makati City, Metro Manila, Philippines 1210',
  },
  {
    id: 'auckland',
    label: 'New Zealand Office',
    city: 'Auckland Airport',
    lines: ['Level 1 Quad 7 Building', '6 Leonard Isitt Drive', 'Auckland Airport, New Zealand 2022'],
    full: 'Level 1 Quad 7 Building, 6 Leonard Isitt Drive, Auckland Airport, New Zealand 2022',
  },
]

export type Social = { id: 'facebook' | 'youtube' | 'linkedin' | 'tiktok'; name: string; url: string; handle: string }

export const socials: Social[] = [
  { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/svconsultancy', handle: 'svconsultancy' },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/securevisa', handle: 'securevisa' },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/securevisa-consultancy/',
    handle: 'securevisa-consultancy',
  },
  { id: 'tiktok', name: 'TikTok', url: 'https://www.tiktok.com/@securevisaph', handle: '@securevisaph' },
]

/** Primary navigation. Blog is intentionally excluded. */
export const nav: NavItem[] = [
  {
    label: 'Destinations',
    children: [
      { label: 'New Zealand', href: '/new-zealand-services/', description: 'Student visa to residency in New Zealand' },
      { label: 'Canada', href: '/canada-services/', description: 'Student visa to residency in Canada' },
    ],
  },
  { label: 'Process', href: '/process/' },
  {
    label: 'About',
    children: [
      { label: 'Our story', href: '/about/', description: 'How Jan and Aina started Secure Visa' },
      { label: 'Meet the team', href: '/meet-the-team/', description: 'The people who work with your family' },
    ],
  },
  { label: 'Stories', href: '/success-stories/' },
  { label: 'Podcast', href: '/podcast/' },
]

export const headerCta = { label: 'Book a free assessment', href: '/connect/' } as const

/** Legal pages live on the current securevisa.com site. (Their /disclaimer/ page returned 404 at scrape time, so it is left out.) */
export const legalLinks: { label: string; href: string }[] = [
  { label: 'Terms of Service', href: 'https://www.securevisa.com/terms-of-service/' },
  { label: 'Privacy Policy', href: 'https://www.securevisa.com/privacy-policy/' },
  { label: 'Cookie Policy', href: 'https://www.securevisa.com/cookie-policy/' },
  { label: 'Acceptable Use Policy', href: 'https://www.securevisa.com/acceptable-use-policy/' },
]

/** External funnel pages. All open in the same tab. */
export const funnel = {
  nzVideo: { label: 'Watch the free 40-min video', href: 'https://study.securevisa.com/nz' },
  video60: { label: 'Watch the free 60-min video', href: 'https://study.securevisa.com/now/' },
  nzWebinar: { label: 'Register for the free NZ webinar', href: 'https://study.securevisa.com/nz-webinar/' },
  canadaVideo: { label: 'Watch the free 60-min video', href: 'https://study.securevisa.com/CANADA-PR/' },
} as const

export const icef = {
  agencyNumber: '6149',
  badge: 'accreditation-icef-badge.webp',
  badgeAlt: 'ICEF accredited agency, agency number 6149',
  link: 'https://www.icef.com/agency/0016M00002SLaC0QAL',
  heading: 'We are ICEF accredited',
  paragraphs: [
    'For over 30 years, ICEF has vetted student recruitment agencies to ensure that only the best can participate in ICEF events. As a result, the organisation has become synonymous with exceptional agency quality.',
    'ICEF has conducted vigorous reference checks to ensure our company, Secure Visa, is reputable and follows best practices.',
    'What’s in it for you? This will give you peace of mind that we are not just any fly-by-night company.',
  ],
} as const

export const partners = {
  institutions: '1,000+',
  institutionsLabel: 'partner institutions',
  programs: '25,000+',
  programsLabel: 'programs',
  heading: 'International school partners',
  text: 'We empower our students by making them part of the process to choose eligible programs that are more than 1,000++ affiliated-partner institutions with renowned programs of over 25,000 in the field of Business, Technology, Engineering, Sciences, Healthcare, Constructions across degrees and levels for New Zealand, Canada, and Australia.',
  /** The partner-school logo strip is 28,474px wide, so it ships as two tiles that sit edge to edge. */
  stripTiles: ['logo-scroll-partner-strip-1.webp', 'logo-scroll-partner-strip-2.webp'],
} as const

/** Figures the founders state on the About page. */
export const milestones = {
  founded: 2018,
  peopleHelped: 'more than 1,000 people begin their emigration to New Zealand',
  assessments: 'more than 4,000 people have done our assessment',
  webinarPeak: 5000,
} as const

/** Press logos shown on the original site's "Featured In" strip. */
export const featuredIn = {
  heading: 'Featured in',
  outlets: ['Fox', 'Medium', 'NBC', 'Genius Network', 'Entrepreneur', 'ABC', 'CBS News'],
  wide: 'featured-in-logo-1.svg',
  compact: 'featured-in-logo-group.webp',
} as const
