// Everyone on pages/meet-the-team.md. Photos were mapped by the order of <img> tags next to each name in the
// scraped HTML and checked by eye. Every photo is a portrait on a pale blue studio backdrop.

export type TeamMember = {
  id: string
  name: string
  role: string
  /** Paragraphs, verbatim apart from obvious typo fixes. */
  bio: string[]
  /** Short pull quote or tagline shown in the original. */
  quote?: string
  tagline?: string
  photo?: string
  alt: string
}

export const teamIntro = {
  title: 'Meet the team behind Secure Visa',
  body: 'When you join our family, we work with yours until you’re living your dream life in a brand new home!',
} as const

export const founders = {
  names: 'Aina & Jan Sacdalan',
  role: 'Founder, CEO',
  bio: [
    'Aina and Jan are the founders of Secure Visa Consultancy. They were once migrants that took the study pathway in New Zealand, and successfully obtained their permanent resident visas. It was not a smooth journey and they also met a lot of migrants who experienced the same challenges before achieving their goal. Hence, they have created Secure Visa. To provide the best solutions, give a seamless process, and eliminate the obstacles for aspiring migrants.',
  ],
  photo: 'team-sec2-img1.webp',
  alt: 'Aina and Jan Sacdalan, founders of Secure Visa, standing back to back and smiling',
} as const

export const team: TeamMember[] = [
  {
    id: 'em-eballa',
    name: 'Em Eballa',
    role: 'Digital Programme Administrator Operations Lead Manager',
    tagline: 'Get all the smiles from Em',
    quote: 'Fall seven times, stand up eight.',
    bio: [
      'Em’s passion for helping people around her is a gift on its own. She loves being a resource to ease the journey where possible. Working in the immigration industry for years has developed her resiliency. This made her strong as a person and in her career.',
    ],
    photo: 'team-em-eballa.webp',
    alt: 'Em Eballa, smiling in a dark blazer',
  },
  {
    id: 'jesiel-sabanal',
    name: 'Jesiel Sabanal',
    role: 'Lead Education Specialist',
    bio: [
      'With years of Sales and Customer Service Experience, Jes believes in quality over quantity, thus going for the extra mile to serve clients. She knows that the key to winning a client’s trust is when you have that ability to relate and understand each of their needs which equate to a great customer experience.',
    ],
    photo: 'team-photo-03.webp',
    alt: 'Jesiel Sabanal, wearing a blush-pink top',
  },
  {
    id: 'neth-cordero',
    name: 'Neth Cordero',
    role: 'Senior Lead Specialist - New Zealand Subject Matter Expert',
    bio: [
      'Subject-Matter-Expert working with the team to deliver quality recommendations on school and programs in New Zealand. Being knowledgeable about the business, Neth is always ensuring the needs of our clients and involves contacting them to identify their needs and facilitate the process to meet the requirements. Her significant years of experience here in the Philippines and abroad leads her to help both clients and team members to have a clearer vision and goals in life.',
    ],
    photo: 'team-photo-05.webp',
    alt: 'Neth Cordero, wearing a grey blazer',
  },
  {
    id: 'marjorie-de-vega',
    name: 'Marjorie De Vega',
    role: 'Education Specialist',
    bio: [
      // The source bio calls her "Joy" (copied from a colleague's entry); her name is used here.
      'Being naturally meticulous and detail-oriented, Marjorie makes it an efficient and effective specialist. For her, being young means being flexible and adaptive. In the ever-changing world of customer service, she always makes sure to learn up-to-date things to provide a quality experience to her clients. Her willingness on going the extra mile for them only shows commitment and dedication.',
    ],
    photo: 'team-photo-06.webp',
    alt: 'Marjorie De Vega, wearing a white top',
  },
  {
    id: 'klarissa-joy-torreliza',
    name: 'Klarissa Joy Torreliza',
    role: 'Lead Documentation Specialist',
    bio: [
      'Joy’s work experience in HR Admin built a strong foundation in gaining the skills required to create good customer service. Her professionalism, patience, and a “people-first” attitude are one of her guidelines in life in creating a good and peaceful environment at work.',
      'She loves to learn. The subject matter that interests her most will be determined by her other themes and experiences but whatever the subject, she will always be drawn to the process of learning. Her ability to adapt, harmonize, connect, learn, and bring positivity is one of her greatest strengths that build her character in the industry.',
    ],
    photo: 'team-photo-08.webp',
    alt: 'Klarissa Joy Torreliza, wearing an olive green sweater',
  },
  {
    id: 'christine-ronquillo',
    name: 'Christine Ronquillo',
    role: 'Canada Subject Matter Expert - Specialist',
    bio: [
      'Christine’s work experience in HR and Recruitment built a strong foundation in gaining the skills required to create good Customer Service and collaborative Client Management. She is responsible, detail oriented, and deliberative in her tasks to ensure accuracy, efficiency, and effectiveness. Her passion to learn and master her role enables her to be creative, and strategic and share her input to provide solutions whenever necessary.',
    ],
    photo: 'team-photo-09.webp',
    alt: 'Christine Ronquillo, wearing a grey cowl-neck sweater',
  },
  {
    id: 'kirby-lubi',
    name: 'Kirby Lubi',
    // The scraped markdown omits this line; the original HTML lists "Lead Documentation Specialist" under his name.
    role: 'Lead Documentation Specialist',
    bio: [
      'Kirby is a customer service-oriented and dedicated specialist for always provides quality service to clients. His eagerness to learn new things and consistency make him more passionate at work. He is part of the Documentations team handling both New Zealand and Canada, continuously providing the best quality service to respective clients.',
    ],
    photo: 'team-photo-10.webp',
    alt: 'Kirby Lubi, wearing a light blue shirt',
  },
  {
    id: 'ana-kristell-faustino',
    name: 'Ana Kristell Faustino',
    role: 'Client Care Specialist & Canada School Coordinator',
    bio: [
      'Kristell is a hard-working and detail-oriented person. She graduated from Colegio de San Juan de Letran with a Bachelor’s degree in Hospitality management. As part of the Secure Visa family, she will make you feel welcomed and secure with your dreams and goals for your family.',
      'With experience in the people industry, she uses the skills and knowledge she has acquired over the years to give our clients the best service she can.',
    ],
    photo: 'team-photo-11.webp',
    alt: 'Ana Kristell Faustino, wearing a mustard-yellow blouse',
  },
]

export const teamVideo = {
  title: 'This is why we get out of bed',
  href: 'https://www.youtube.com/watch?v=XHOmBV4js_E',
  thumbnail: 'team-video-thumbnail.webp',
  alt: 'Video thumbnail for “This is why we get out of bed”',
} as const
