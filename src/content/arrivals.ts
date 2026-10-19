// Real arrival-hall photos. Names are exactly as written on each person's sign.
// Every sign reads "Welcome to New Zealand, from your Secure Visa family", so destination is AKL.

export type Arrival = {
  id: string
  /** Name as written on the sign. */
  name: string
  /** True for the eight photos DESIGN.md lists for the hero board. */
  board: boolean
  origin: 'MNL'
  destination: 'AKL'
  status: 'LANDED'
  image: string
  alt: string
}

type Seed = { id: string; name: string; image: string; scene: string; board?: boolean }

const seeds: Seed[] = [
  { id: 'raz-family', name: 'Raz Family', image: 'testimonial-raz-family-scaled.webp', scene: 'six adults and two children cheering together', board: true },
  { id: 'julie-mercado', name: 'Julie Mercado', image: 'testimonial-julie-mercado-scaled.webp', scene: 'a smiling woman', board: true },
  { id: 'miranda-family', name: 'Miranda Family', image: 'testimonial-marie-and-merwin-miranda-scaled.webp', scene: 'a mother, father and daughter, with Dad waving', board: true },
  { id: 'jesy-allen', name: 'Jesy & Allen Natividad', image: 'testimonial-jessy-and-allen-scaled.webp', scene: 'a couple with thumbs up beside their luggage', board: true },
  { id: 'kim-barnes', name: 'Kim Barnes', image: 'success-story-photo-img-7387-scaled.webp', scene: 'two women in striped and black tops', board: true },
  { id: 'jade-molina', name: 'Jade Molina', image: 'success-story-photo-img-7405-scaled.webp', scene: 'two women laughing together', board: true },
  { id: 'grace-john', name: 'Grace & John', image: 'success-story-photo-img-7140-1-scaled.webp', scene: 'a mother, father and daughter', board: true },
  { id: 'jhilyn-de-la-cruz', name: 'Jhilyn de la Cruz', image: 'success-story-photo-img-7197-scaled.webp', scene: 'two women smiling', board: true },
  { id: 'camille-erestain', name: 'Camille Erestain', image: 'testimonial-camille-scaled.webp', scene: 'a woman in a face mask' },
  { id: 'grethel-fernando', name: 'Grethel Fernando', image: 'testimonial-grethel.webp', scene: 'three women smiling' },
  { id: 'anne-bien', name: 'Anne & Bien', image: 'testimonial-anne-and-bien-scaled.webp', scene: 'two women and a man' },
  { id: 'manilyn-bonifacio', name: 'Manilyn Bonifacio', image: 'testimonial-manilyn.webp', scene: 'a woman in a face mask beside the Auckland Airport welcome board' },
  { id: 'marila-cortez', name: 'Marila Cortez', image: 'testimonial-marila.webp', scene: 'a woman pointing toward the arrivals gate' },
  { id: 'archie-nanette', name: 'Archie & Nanette', image: 'testimonial-airport-archie-nanette-sqaure.webp', scene: 'a man and two women' },
  { id: 'chrisianne-santos', name: 'Chrisianne Santos', image: 'testimonial-airport-chrisianne-santos.webp', scene: 'a woman in a yellow blazer' },
  { id: 'christa-castor', name: 'Christa Castor', image: 'testimonial-airport-christa-castor.webp', scene: 'two women in denim jackets' },
  { id: 'christine-manlapaz', name: 'Christine Manlapaz', image: 'testimonial-airport-christine-manlapaz.webp', scene: 'a woman and a man giving a thumbs up' },
  { id: 'francis-silva', name: 'Francis Silva', image: 'testimonial-airport-francis-silva.webp', scene: 'two men, one pointing at the other' },
  { id: 'jemima-respicio', name: 'Jemima Respicio', image: 'testimonial-airport-jemima-respicio.webp', scene: 'two women with their arms around each other' },
  { id: 'jessyka-sevilla', name: 'Jessyka Sevilla', image: 'testimonial-airport-jessyka-sevilla.webp', scene: 'two women smiling by a luggage trolley' },
  { id: 'joven-magisa', name: 'Joven Magisa', image: 'testimonial-airport-joven-magisa.webp', scene: 'a woman and a man giving a thumbs up' },
  { id: 'kimberly-tamondong', name: 'Kimberly Tamondong', image: 'testimonial-airport-kimberly-tamondong.webp', scene: 'two women smiling' },
  { id: 'laguilles-family', name: 'Laguilles Family', image: 'testimonial-airport-laguilles-family.webp', scene: 'two women, a man and two boys' },
  { id: 'maricar-belsondra', name: 'Maricar Belsondra', image: 'testimonial-airport-maricar-belsondra.webp', scene: 'three women behind a luggage trolley' },
  { id: 'maryam', name: 'Maryam', image: 'testimonial-airport-maricon-santos.webp', scene: 'two women, one wearing a hijab and face mask' },
  { id: 'rafael-atienza', name: 'Rafael Atienza', image: 'testimonial-airport-rafael-atienza.webp', scene: 'a woman in a denim jacket and a man' },
  { id: 'raymundo-family', name: 'Raymundo Family', image: 'testimonial-airport-raymundo-family.webp', scene: 'a couple with arms wide and their young son' },
  { id: 'richelle-estillore', name: 'Richelle Estillore', image: 'testimonial-airport-richelle-estillore.webp', scene: 'a woman and a man giving a thumbs up' },
  { id: 'sherline-casasis', name: 'Sherline Casasis', image: 'testimonial-airport-sherline-casasis.webp', scene: 'two women behind a luggage trolley' },
]

export const arrivals: Arrival[] = seeds.map((s) => ({
  id: s.id,
  name: s.name,
  board: s.board ?? false,
  origin: 'MNL',
  destination: 'AKL',
  status: 'LANDED',
  image: s.image,
  alt: `${s.name}: ${s.scene}, holding a sign reading "Welcome to New Zealand, from your Secure Visa family" in the Auckland Airport arrivals hall`,
}))

/** The eight rows of the hero arrivals board, in display order. */
export const boardArrivals: Arrival[] = arrivals.filter((a) => a.board)

/** One more arrival photo with no sign, used on the Success Stories page. */
export const unnamedArrival = {
  image: '280117788-533511634835817-881177546421459375-n-n.webp',
  alt: 'Three Secure Visa clients holding a welcome sign at an airport arrivals hall',
} as const
