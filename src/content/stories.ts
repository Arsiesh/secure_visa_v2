// Success Stories page: client review graphics and arrival photos.
// Names, countries and roles are read from each graphic; where a graphic shows no name it is left out.

import { arrivals, unnamedArrival } from './arrivals'

export const storiesIntro = {
  title: 'Living your dream life in a brand new home!',
  lead: 'We’re committed to your success. In fact, we base our own success on yours. This doesn’t involve giving you a blueprint around how to apply. This sees us help you along each step of the journey—from the moment you think about immigrating to long after you land and settle in.',
  stat: 'We’ve helped more than 1,000 people begin their immigration to New Zealand.',
  subheading: 'When you work with us, you become part of our family.',
  invite: 'Here are a few people we’ve already had the pleasure of partnering with…',
} as const

export type ReviewGraphic = {
  id: string
  image: string
  /** First name as shown on the graphic, if any. */
  name?: string
  from?: string
  role?: string
  alt: string
}

function r(n: string, name?: string, from?: string, role?: string): ReviewGraphic {
  const who = [name, role, from].filter(Boolean).join(', ')
  return {
    id: 'review-' + n,
    image: 'success-story-screenshot-' + n + '.webp',
    name,
    from,
    role,
    alt: who ? 'Client review from ' + who : 'Client review graphic from a Secure Visa client',
  }
}

/** Review graphics, 940x788 each. Number 11 does not exist in the source, and 27 repeats 26 so it is left out. */
export const reviewGraphics: ReviewGraphic[] = [
  r('01', 'Michael', 'Philippines', undefined),
  r('02', undefined, undefined, undefined),
  r('03', 'Angela', 'Philippines', undefined),
  r('04', undefined, undefined, undefined),
  r('05', 'Mary', 'Philippines', undefined),
  r('06', undefined, undefined, undefined),
  r('07', 'Mary', 'Philippines', 'RCIC discussion'),
  r('08', undefined, undefined, 'Email feedback'),
  r('09', undefined, undefined, 'Email feedback'),
  r('10', 'Anna', 'Philippines', undefined),
  r('12', 'Matthew', 'Philippines', undefined),
  r('13', 'Kerbie', 'Saudi Arabia', undefined),
  r('14', 'Lorien', undefined, undefined),
  r('15', 'Vivian', undefined, undefined),
  r('16', 'Mary', undefined, undefined),
  r('17', 'Alelie', 'UAE', 'Healthworker'),
  r('18', 'Nikka', 'Philippines', 'Graphic Artist'),
  r('19', 'Erwin', 'KSA', undefined),
  r('20', 'Angel', 'KSA', undefined),
  r('21', 'Rhonalyn', 'Qatar', 'Nurse'),
  r('22', 'Joella', 'Qatar', 'Admin. Assistant'),
  r('23', 'Grace', 'Philippines', 'Project Admin. Officer'),
  r('24', 'Shey', 'Philippines', 'Online Teacher'),
  r('25', 'Perci', 'Philippines', 'Banker'),
  r('26', 'Julie', 'Philippines', 'Database Engineer'),
  r('28', 'Ver', undefined, undefined),
  r('29', 'Mark', undefined, undefined),
  r('30', 'Gissele', 'Qatar', 'HR Administrator'),
  r('31', 'Jessica', 'Philippines', 'Project Manager'),
  r('32', 'Myrna', 'Saudi Arabia', 'Midwife'),
  r('33', 'Gie', 'Qatar', 'HR Administrator'),
  r('34', 'Monna', 'Philippines', 'Music Teacher'),
  r('35', 'Mari', 'Philippines', 'Businesswoman'),
  r('36', 'Romeo', 'KSA', 'Supply Demand Supervisor'),
  r('37', 'Hayde', 'Philippines', 'Licensed Teacher'),
  r('38', 'Mark', 'Philippines', 'Property Investment Consultant'),
  r('39', 'Raquel', 'Dubai', 'Teacher'),
  r('40', 'Reden', undefined, undefined),
  r('41', 'Ann', undefined, undefined),
  r('42', 'Key', undefined, undefined),
  r('43', 'Raul', 'Philippines', 'Engineer'),
  r('44', 'Claud', 'Philippines', 'Technology Manager'),
  r('45', 'Evangeline', 'KSA', 'Caregiver'),
  r('46', 'Pamela', 'Philippines', 'Sales Associate'),
  r('47', 'Cristina', 'Philippines', 'IT Specialist'),
  r('48', 'Wilfred', 'Philippines', undefined),
  r('49', 'Marilou', 'Philippines', undefined),
  r('50', 'Allan', 'UAE', 'Airport Service Agent'),
  r('51', 'Kay', 'Japan', 'Health Professional'),
  r('52', 'Jeremy', 'Philippines', 'Area Manager'),
  r('53', 'Aiza', 'KSA', 'Nurse'),
  r('54', 'Kath', 'Bahrain', 'Health Professional'),
  r('55', 'Marichu', 'Papua New Guinea', 'Accountant'),
  r('56', 'Nafe', 'Philippines', 'Health Worker'),
  r('57', 'Luis', 'Philippines', 'Manager'),
  r('58', 'Joan', 'Philippines', 'School Librarian'),
  r('59', 'Perci', 'Philippines', 'Education Administrator'),
  r('60', 'Marites', 'Philippines', undefined),
  r('61', 'Jesus', 'Qatar', 'Registered Nurse'),
  r('62', 'Cleo', 'Philippines', undefined),
  r('63', 'Jeric', 'Philippines', 'Emergency Management Professional'),
  r('64', 'Shalla', 'Philippines', 'Logistics Executive'),
  r('65', 'Mary', 'KSA', 'Registered Nurse'),
  r('66', 'Cecille', 'Philippines', 'Entrepreneur'),
  r('67', 'Rosa', 'Philippines', 'Education Professional'),
  r('68', 'Joyce', 'Philippines', 'Pharmacist'),
  r('69', 'Anina', 'Philippines', 'Admin. Staff'),
  r('70', 'DJ', 'Philippines', 'Artist'),
  r('71', 'Marianne', 'Philippines', 'Audit Analyst'),
  r('72', 'Carmela', 'Philippines', 'Higher Education Instructor'),
  r('73', 'Claud', 'Philippines', 'Team Manager'),
  r('74', 'Chib', 'Philippines', 'Nursing Assistant'),
  r('75', 'Celeste', 'Philippines', undefined),
  r('76', 'Tinee', 'Philippines', 'Sales Professional'),
  r('77', 'Mich', 'Philippines', undefined),
  r('78', 'Joan', 'Philippines', 'Works in the tourism industry'),
  r('79', 'Evelyn', 'UAE', 'Medical Lab Technologist'),
]

export type StoryPhoto = { id: string; image: string; name: string; alt: string }

/** Arrival-hall photos, in the order the original page shows them. */
export const arrivalPhotos: StoryPhoto[] = arrivals.map((a) => ({
  id: a.id,
  image: a.image,
  name: a.name,
  alt: a.alt,
}))

export const extraArrivalPhoto = unnamedArrival
