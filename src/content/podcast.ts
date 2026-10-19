// The Secure Visa Podcast: episodes 12 to 17 (page 1 of the original archive) and listening platforms.

export type PodcastEpisode = {
  number: number
  title: string
  description?: string
  thumbnail: string
  href: string
  /** From the original podcast_category filter, where the title makes it clear. */
  topic?: 'canada' | 'new-zealand'
}

export const podcastIntro = {
  title: 'The Secure Visa podcast',
  body: 'Listen as we interview former international students, emigration lawyers, and those who know the ins and outs of how to emigrate and gain permanent residency in Canada and New Zealand!',
  cover: 'podcast-cover-art.webp',
  coverAlt: 'The Secure Visa Podcast cover art',
  phoneMockup: 'phone-mockup.webp',
} as const

/** Newest first. */
export const episodes: PodcastEpisode[] = [
  {
    number: 17,
    title: '#KayangKayaSaCanada OFW from Taiwan pursues studies in Canada for her kids',
    thumbnail: 'podcast-episode-17-thumbnail.webp',
    href: 'https://www.securevisa.com/podcast-post/kayangkayasacanada-ofw-from-taiwan-pursues-studies-in-canada-for-her-kids/',
    topic: 'canada',
  },
  {
    number: 16,
    title: 'Permanent Resident in Singapore, Now Studying in Canada! Meet Lara!',
    thumbnail: 'podcast-episode-16-thumbnail.webp',
    href: 'https://www.securevisa.com/podcast-post/permanent-resident-in-singapore-now-studying-in-canada-meet-lara/',
    topic: 'canada',
  },
  {
    number: 15,
    title: '“I quit being a nurse & decided to study in Canada.”',
    thumbnail: 'podcast-episode-15-thumbnail.webp',
    href: 'https://www.securevisa.com/podcast-post/i-quit-being-a-nurse-decided-to-study-in-canada/',
    topic: 'canada',
  },
  {
    number: 14,
    title: '#BetterTogether – Bakit right decision ang Canada para kay Mark & HD?',
    thumbnail: 'podcast-episode-14-thumbnail.webp',
    href: 'https://www.securevisa.com/podcast-post/bettertogether-bakit-right-decision-ang-canada-para-kay-mark-hd/',
    topic: 'canada',
  },
  {
    number: 13,
    title: 'Tips & Truths from Aina – Mahirap ba maging international student?',
    thumbnail: 'podcast-episode-13-thumbnail.webp',
    href: 'https://www.securevisa.com/podcast-post/tips-truths-from-aina-mahirap-ba-maging-international-student/',
  },
  {
    number: 12,
    title: 'The Perfect Time To Migrate – In Your Late 20s? Too Young or Too Old?',
    thumbnail: 'podcast-episode-12-thumbnail.webp',
    href: 'https://www.securevisa.com/podcast-post/the-perfect-time-to-migrate-in-your-late-20s-too-young-or-too-old/',
  },
]

export const podcastArchiveHref = 'https://www.securevisa.com/podcast/'

export type PodcastPlatform = { name: string; logo: string; href: string }

/** Logos are 217x55 colour JPGs (Apple and Spotify have their own PNG/JPG variants of the same size). */
export const platforms: PodcastPlatform[] = [
  { name: 'Apple Podcasts', logo: 'apple-colored.webp', href: 'https://podcasts.apple.com/us/podcast/the-secure-visa-podcast/id1585301991' },
  { name: 'Spotify', logo: 'spotify-colored-f1.webp', href: 'https://open.spotify.com/show/1w1VrgOWGQk5Avd9aS2TlC' },
  { name: 'Castro', logo: 'castro-colored.webp', href: 'https://castro.fm/podcast/a90f9fc0-4f9e-4dca-a646-cfcfe019abb4' },
  { name: 'Castbox', logo: 'castbox-colored.webp', href: 'https://castbox.fm/channel/id4620709' },
  { name: 'Google Podcasts', logo: 'google-colored.webp', href: 'https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8xODUxMTY2LnJzcw' },
  { name: 'Podfriend', logo: 'podfriend-colored.webp', href: 'https://web.podfriend.com/podcast/1585301991' },
  { name: 'Stitcher', logo: 'stitcher-colored-f2.webp', href: 'https://www.stitcher.com/show/the-secure-visa-podcast' },
  { name: 'iHeartRadio', logo: 'iheart-colored.webp', href: 'https://www.iheart.com/podcast/269-the-secure-visa-podcast-88587897/' },
]
