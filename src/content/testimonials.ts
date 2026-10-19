// Real client testimonials, copied from the home and New Zealand pages. No placeholder text.

export type Testimonial = {
  id: string
  quote: string
  name: string
  /** Small avatar (about 40px), when the original shows one. */
  photo?: string
  /** Where the person is from, when the source says so. */
  from?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'krista-nikki',
    name: 'Krista Nikki',
    photo: 'testimonial-krista-nikki.webp',
    quote:
      'Since I am still on the initial stages of my application, I know I still have to go through different processes. So far, they were able to manage expectations and estimated timelines. Also, I’d like to commend Ms. Marjorie for responding to me in a timely manner and for the patience as I have many questions. And I expect more of the same throughout the entire process. Because of this, I feel secure in my application and am truly looking forward to achieving the student visa. Also, I would like to give a shout out to Ms. Gracey, thank you for the follow up.',
  },
  {
    id: 'grace-pantisma',
    name: 'Grace Pantisma',
    photo: '121621447-10225351582043543-1679991506926286475-n.webp',
    quote:
      'Their service is customized to the needs of every client, they go beyond assisting you with relative documentations. It includes timely updates on the progress of your journey to NZ not to mention the extended services they offer the moment you arrive to NZ.',
  },
  {
    id: 'sherine-marianne-gomez-ignacio',
    name: 'Sherine Marianne Gomez Ignacio',
    photo: '173777594-1789810137858937-1189496981930005532-n.webp',
    quote:
      'I will definitely and absolutely highly recommend Secure Visa Consultancy. This is really the Right Advice for the aspiring students who wants to study and work in Canada.',
  },
  {
    id: 'joan-anniban',
    name: 'Joan Anniban',
    photo: '74834757-2363516587090907-7421747966169317376-n.webp',
    quote:
      'Secure visa consultancy is highly recommended to those who wants to study at NZ or Canada, why? Because it’s legit, very informative sila, updated, friendly, and all staff behind this consultancy maasahan at maasikasuhin sila. Love it.',
  },
  {
    id: 'jesus-jay-vinluan',
    name: 'Jesus Jay Vinluan',
    photo: '231139566-10208785756116605-3331032055217870605-n.webp',
    quote:
      'The clarity call was very clear, understandable and enlightening. We’re so glad to start our future plans with Secure Visa. May Pag-asa sa Secure Visa!',
  },
  {
    id: 'allan-de-guzman-santos',
    name: 'Allan De Guzman Santos',
    photo: '271996142-3086619211555200-7609655837062922218-n.webp',
    quote: 'Their professionalism and commitment are impressive, they also make sure that they hear your concerns.',
  },
  {
    id: 'elma-magsino-mendoza',
    name: 'Elma Magsino Mendoza',
    photo: '268283082-4937792192939952-4212081043654752730-n.webp',
    quote: 'You will really feel in them that they won’t let you down. Thank you Secure Visa. God bless and keep safe!',
  },
  {
    id: 'angelica-rimas',
    name: 'Angelica Rimas',
    photo: '233228988-682506956479140-7700637224510137305-n.webp',
    quote: 'Yes! I definitely recommend Secure Visa for their professionalism. They are helpful.',
  },
  {
    id: 'tinee-rodrigo',
    name: 'Tinee Rodrigo',
    photo: '269987839-10158410698276272-4308213972050667279-n.webp',
    quote: 'Quality of service and hands on guidance.',
  },
  {
    id: 'kay-montanez-banas',
    name: 'Kay Montañez-Bañas',
    photo: '247701045-4881622575190982-246891289864431232-n.webp',
    quote: 'Best Valued Consulting Service!',
  },
  {
    id: 'abi-gail',
    name: 'Abi Gail',
    photo: '215480157-4088013214581738-8880989863341671648-n.webp',
    quote: 'Quality service. Security wise.',
  },
]

/** The Perci quote from the home page. The original shows no confirmed photo for Perci, so none is set. */
export const perciQuote: Testimonial = {
  id: 'perci',
  name: 'Perci',
  from: 'Philippines',
  quote:
    'I would like to thank Secure Visa! They’ll be the path for people who want to make way and go to other country. They value me as a client. Secure Visa still continues to communicate with me even after our discussion. And nasunod ang gusto ko. Kahit weekend, nagrerespond sila!',
}

/** Longer client letters shown on the destination pages. `headline` is the sentence the original sets as a heading. */
export type LongTestimonial = {
  id: string
  destination: 'nz' | 'canada'
  headline: string
  body: string
  attribution: string
}

export const longTestimonials: LongTestimonial[] = [
  {
    id: 'abi-admin-staff',
    destination: 'nz',
    headline:
      'What I like about the service is that you discussed it well the processes which is really vital for us client and letting us feel how secured we are here in Secure Visa from scratch.',
    body: 'I would love to recommend it. I’ve already recommended you guys to my friend and this friend already started her pathway / dreams with you guys which makes me happy. So absolutely a YES for Secure Visa! To my specialist, Ms. Jes thank you for being so patient and understanding for all of the queries I had and she allows me to speak and hears my thoughts. Thank you again, really appreciate it. Coz based on my experience with this agency from Pampanga who scammed us, and other agencies I’ve inquired, Secure Visa is only the agency whom I can trust based on the testimonials and their mission and vision to achieve our goal/ dream. Looking forward to working with you guys! Thank you!',
    attribution: 'Abi, Admin. Staff from the Philippines',
  },
  {
    id: 'anina-admin-staff',
    destination: 'nz',
    headline: 'First, I would like to thank you for organizing this kind of service.',
    body: 'The clarity call I had with Lindon is very informative and satisfying. He is very accommodating. He was able to discuss the things I need and want to know. I actually got more excited when I had the clarity call because I am able to see the direction I’m supposed to follow. Everything is discussed well and orderly. Secondly, it is amazing to know that while waiting for me to go to the next step, Lindon will still be willing to answer whatever questions I have. I would say that I will recommend your service, though even before I had the clarity call, I already informed and referred your page to some of my friends since I have been a follower for how many years now. I am truly satisfied. Thanks again!',
    attribution: 'Anina, Admin. Staff from the Philippines',
  },
  {
    id: 'joanna-nurse',
    destination: 'canada',
    headline:
      'Thank you for being passionate about answering all my questions about student program pathway especially to Ma’am Kristine and Ma’am Joy.',
    body: 'You have been consistent in reminding me about the status of my application. Everything went smoothly. I highly recommend Secure Visa to my friends and my colleagues. Kudos to your team. Thank you Secure Visa for providing an excellent service to achieve my Canada dream through study program pathway. Living overseas and communication online can be pressure at times but you’ve made it possible. Ma’am Aina’s journey was really inspiring that made me decide about my future. Thank you very much. I want to take this opportunity to express my enormous thanks and appreciation for Secure Visa for being with me in this journey. It will not be possible without your professional guidance. Your service was excellent and indeed hassle-free. More power to your team. God bless!',
    attribution: 'Joanna, Registered Nurse from the Philippines',
  },
  {
    id: 'marianne-audit-analyst',
    destination: 'canada',
    headline: 'To be really honest, you had me just by watching the 60-minute video.',
    body: 'Then the clarity call session with Ms. Kristine is what finally made me decide to avail your services. She was accommodating, friendly and thorough in discussing all the details and answering all my concerns. What I like most about the services is the post arrival and extended settlement support. I’m sure being in a new country and starting over would be overwhelming, but with that service, I know that I would be really secured with your team. Truly, a very fitting name for your company. Looking forward to working with you. I am excited about what the future holds. I know that I’m in good hands with your team. I will recommend your services to other, that’s for sure!',
    attribution: 'Marianne, Audit Analyst from the Philippines',
  },
]
