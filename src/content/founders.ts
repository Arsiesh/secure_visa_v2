// Jan and Aina Sacdalan's story, chaptered from pages/about.md and the home page.
// Text is verbatim apart from removing the duplicated paragraphs the original repeats for mobile.

export type FounderChapter = {
  id: string
  /** Year or date shown on the timeline, taken from the text. */
  when: string
  title: string
  body: string[]
  image?: { src: string; alt: string }
}

export const foundersIntro = {
  title: 'Dreams',
  lead: 'Before we helped thousands begin their emigration to New Zealand (and hundreds accomplish it), we first did it ourselves. But it almost destroyed us.',
  homeHeading: 'Hi! We’re Jan and Aina, and in 2015 we were exactly where you are now!',
  homeBody: [
    'We had worked hard and saved money, and we had dreams of starting a family in a new country that would give us the security, opportunities, and wealth we desired. We thought we’d found the perfect place to live. And we thought we had found the right immigration advisor to help us.',
    'We were wrong. It was a mistake that cost us Php 500,000! We hit rock bottom and felt like we had missed out on our “one” chance.',
    'But again… we were wrong.',
    'This Php 500,000 mistake helped us uncover the proven process that has helped us secure permanent residency for dozens of our clients in countries like Canada and New Zealand.',
  ],
  homeCta: { label: 'Read our origin story to find out how', href: '/about/' },
} as const

export const founderChapters: FounderChapter[] = [
  {
    id: 'dream-board',
    when: 'January 2015',
    title: 'We’re young, married, living in the Philippines, and in love.',
    body: [
      'January of 2015: We’re young, married, living in the Philippines, and in love. Our dream is to immigrate to where the quality of life is better.',
      'We make a “dream board,” a large collage with photos of the life we want to create. We put pictures of a beautiful home, a nice car, money with “$50,000 a month” written on it, and a photo of a baby girl.',
      'In reality, we have $10,000 of debt and Jan’s awful, old car that smells like dirty carpet. Our jobs don’t make much money.',
      'But we are excited!',
    ],
  },
  {
    id: 'the-scam',
    when: '2015',
    title: 'The company we’d hired was a scam.',
    body: [
      'Jan has the idea for us to emigrate to Canada, where he has family. He’s found a company that has guaranteed him a work visa by securing him a job with a Canadian company. Their fee is $10,000!',
      '$10,000 is far more than we’ve ever spent, but we do it. We fill out all the complicated applications. Then we sell all our stuff and move in with Jan’s parents, getting ready to move to Canada. We are excited!',
      'Six months later, Jan gets the news….',
      'The news is devastating—and about to get worse.',
      'The company we’d hired to help us was a scam. They didn’t have a legal process for getting us a visa.',
      'It is a painful experience and an expensive lesson.',
      'We feel angry and lost, which causes us to argue; it almost destroys our marriage.',
      'Our dreams are shattered.',
    ],
    image: { src: 'about-section-04-image.webp', alt: '' },
  },
  {
    id: 'a-miracle',
    when: 'Late 2015',
    title: 'But then a miracle happens. God sends help.',
    body: [
      'Jan’s dad suggests a guy who might be able to get Aina a student visa in New Zealand and Jan a partner work visa.',
      'He explains that it will give us a chance to create a pathway to permanent residency.',
      'We decide to go for it! (The cost is much less this time.)',
      'In only a month, Aina’s application for a student visa gets approved! Jan gets his visa two weeks later!',
    ],
    image: { src: 'about-image-01.webp', alt: '' },
  },
  {
    id: 'new-zealand',
    when: 'February 2016',
    title: 'We start our new life in New Zealand.',
    body: [
      'So in February of 2016, we start our new life in New Zealand.',
      'Our beginning is humble. We rent a tiny flat and get low-paying jobs. Jan finds work on a ventilator assembly line (awful), while Aina is required to be a student and restricted to a part-time job.',
      'We can’t even afford to go to the movies, so we take walks in the park and generate ideas for a business we can start if we get residency.',
      'Sell soap? Open a Filipino grocery store? Digital marketing? We are unsure.',
    ],
    image: { src: 'about-image-1-v1.webp', alt: '' },
  },
  {
    id: 'residency',
    when: 'December 4, 2017',
    title: 'Another miracle moment, and the best Christmas gift.',
    body: [
      'Aina is a marketing assistant, which is not a “skilled job” that qualifies for residency. She works at the company that helped us immigrate.',
      'One day she sees an opportunity.',
      'Aina proposes to her boss, “Let me be your Marketing Officer, and I’ll grow the business using digital marketing.” If Aina could become a “Marketing Officer,” she’d have a “skilled job” required for residency.',
      'Her boss replies, “Get 20 new clients, and I’ll give you the promotion.”',
      'With Jan’s help, she gets 64 clients — and the promotion!',
      'Then, on December 4, 2017, only two years after emigrating to NZ, we receive the best Christmas gift!!!',
    ],
    image: { src: 'about-image-2-v2.webp', alt: '' },
  },
  {
    id: 'founding',
    when: '2018',
    title: 'We launch Secure Visa.',
    body: [
      'After all the hardship we’d gone through — the scam, the complicated application process, and the difficulty of starting over in a new country (plus all the students we’d witnessed face many challenges because of incorrect advice and pastoral care) — we know precisely the business we want to start.',
      'We know we can create a better, more supportive way to emigrate to New Zealand. So in 2018, we launch our company in our home, a short distance from our bed.',
      'Today we’ve helped more than 1,000 people begin their emigration to New Zealand (and hundreds accomplish it), and more than 4,000 people have done our assessment. Our webinars, which started with 100 attendees, have grown to 5,000, the maximum number allowed on the call.',
    ],
    image: { src: 'about-image-3-v1.webp', alt: '' },
  },
  {
    id: 'today',
    when: 'Today',
    title: 'Remember our dream board?',
    body: [
      'Every day we are grateful for our life in the wonderful country of New Zealand. We live in the home of our dreams, which includes enough rooms to have offices in our house. We have 18 employees (and growing!). And the smelly old car has been replaced by a BMW. (Thank God!)',
      'Best of all, on July 10, 2019, we had a baby girl! Aina’s parents and siblings were there while she was pregnant and after she gave birth. It was easy to invite them because we are residents!',
      'And our daughter’s name is Amara Dream Sacdalan. We chose her middle name because following our dreams gave us our dream life.',
    ],
    image: { src: 'about-image-5-v1.webp', alt: '' },
  },
]
