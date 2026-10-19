// The five-step process and Pre / During / Post support. Copy from pages/process.md.

export type ProcessStep = {
  step: 1 | 2 | 3 | 4 | 5
  title: string
  body: string
  image: string
  imageAlt: string
}

export const processIntro = {
  title: 'We are here for you throughout',
  body: 'with our proven process that ensures you and your family get the service and support you deserve along each step of the way—beginning before you even begin.',
} as const

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Student Eligibility “Accelerator Assessment”',
    body: 'Remember, we’ve been through this process. We know how exciting it is but also how overwhelming it can get (not to mention the fear of being so far away from the rest of your family).\n\nWhen you work with us, you become part of our family. We then work with your family to help achieve your dream life.',
    image: 'process-section-02-image-01.webp',
    imageAlt: '',
  },
  {
    step: 2,
    title: 'School Registration',
    body: 'With help from our Documentation Specialist, we’ll help you find, apply, and register for your study program—including regular meetings with our specialists so you get the information you need, when you need it (and so we can answer your most pressing questions at all times).',
    image: 'process-books-image.webp',
    imageAlt: '',
  },
  {
    step: 3,
    title: 'Student Visa Application',
    body: 'Once you’re accepted into your new school, we’ll prepare you for your student visa application and make sure you have everything you need. From reviewing and preparing you for your English exam to ensuring you have all the forms and details you need, we set you up for a successful application (saving you time, money, and a lot of sleepless nights!).',
    image: 'process-section-02-image-03.webp',
    imageAlt: '',
  },
  {
    step: 4,
    title: 'Finalizing Your Documents',
    body: 'At this stage, you’re almost ready to submit your visa application and begin your new life in an exciting new land…but first we have you work with one of our immigration lawyers/licensed immigration advisers to make sure everything is ready for submission—including a mock interview to help prepare you for your big day as well as lots of calls and meetings to ensure you have everything you need.',
    image: 'process-meeting-image.webp',
    imageAlt: '',
  },
  {
    step: 5,
    title: 'Lodgement',
    body: 'The time has come to complete, signoff on, and submit your immigration forms, and you’ll continue to work with one of our experienced immigration specialists who’ll answer your questions, optimize your application, and prepare you for what comes next.',
    image: 'process-section-02-image-05.webp',
    imageAlt: '',
  },
]

export const processFootnote = {
  before: 'Of course, all this is only the tip of the iceberg! Our Free Online Presentation provides detailed insight into each step',
  linkLabel: 'click here to access',
  linkHref: 'https://study.securevisa.com/now/',
  after: 'AND…shows you how we personally work with you each step of the way.',
} as const

export type SupportPhase = { id: 'pre' | 'during' | 'post'; title: string; body: string }

export const supportIntro = {
  title: 'Our untouchable support throughout',
  body: 'where most immigration advisors focus on ticking boxes, we go above and beyond each step of the way to give you and your family the personal attention you deserve',
} as const

export const supportPhases: SupportPhase[] = [
  {
    id: 'pre',
    title: 'Pre',
    body: 'Our support begins the moment you begin to think about working with us, not just answering your questions and preparing you for your application but helping you arrange travel, accommodations, and all the other ins and outs most people don’t think about (but we do because we’ve gone through this process ourselves and we know what’s involved!).',
  },
  {
    id: 'during',
    title: 'During',
    body: 'Our support doesn’t end once you submit your application… when accepted, we help finalize your travel, pick you up from the airport, give you a unique and memorable welcome orientation, and have you meet with our dedicated support team in your host country (those first few days after you land are some of the most important in your life and we want you to enjoy them!)',
  },
  {
    id: 'post',
    title: 'Post',
    body: 'Our support not only doesn’t end at the airport, but it continues to serve you and your family long after you arrive at your new home — from preparing you for employment to helping you settle into your new school, we continue to communicate with you in the months that follow (including giving you assistance when the times comes to renew your visa!)',
  },
]

export const processCta = {
  heading: 'Ready to see how we can make this proven process work for you and your family?',
  body: 'We invite you to join us for our free online presentation, where we break this process down in detail, share actual stories from students we’ve worked with, and help you decide whether working with us will help you and your family live your dream life.',
  label: 'Attend our free NZ webinar now',
  href: 'https://migrate.securevisa.com/nz-webinar',
} as const
