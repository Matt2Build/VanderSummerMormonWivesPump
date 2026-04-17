// Current Bravo/Hulu reality cast database with X handles
// Last updated: 2026-04-17

export interface CastMember {
  id: string
  name: string
  show: string
  showId: string
  xHandle?: string
  instagram?: string
  image: string
  dramaScore: number
  status: 'active' | 'recurring' | 'friend' | 'former'
  season: string
  relationships: Relationship[]
}

export interface Relationship {
  targetId: string
  type: 'dating' | 'engaged' | 'married' | 'ex' | 'feud' | 'friends' | 'frenemies' | 'family'
  since?: string
}

export const SHOWS = [
  { id: 'vpr', name: 'Vanderpump Rules', network: 'Bravo', color: '#E50914' },
  { id: 'rhobh', name: 'Real Housewives of Beverly Hills', network: 'Bravo', color: '#FFC0CB' },
  { id: 'rhoslc', name: 'Real Housewives of Salt Lake City', network: 'Bravo', color: '#00CED1' },
  { id: 'rhony', name: 'Real Housewives of New York', network: 'Bravo', color: '#FF69B4' },
  { id: 'rhoa', name: 'Real Housewives of Atlanta', network: 'Bravo', color: '#9B59B6' },
  { id: 'poll', name: 'Summer House', network: 'Bravo', color: '#FF6B35' },
  { id: 'southerncharm', name: 'Southern Charm', network: 'Bravo', color: '#9B59B6' },
  { id: 'mormonwives', name: 'Secret Lives of Mormon Wives', network: 'Hulu', color: '#FFD700' },
] as const

export type ShowId = typeof SHOWS[number]['id']

export const CAST_DB: CastMember[] = [
  // Vanderpump Rules
  {
    id: 'lisa-vanderpump',
    name: 'Lisa Vanderpump',
    show: 'Vanderpump Rules',
    showId: 'vpr',
    xHandle: 'LisaVanderpump',
    instagram: 'lisavanderpump',
    image: 'https://via.placeholder.com/200/E50914/FFFFFF?text=LV',
    dramaScore: 9.2,
    status: 'active',
    season: 'OG',
    relationships: [
      { targetId: 'tom-sandoval', type: 'frenemies' },
      { targetId: 'james-kennedy', type: 'friends' },
    ]
  },
  {
    id: 'tom-sandoval',
    name: 'Tom Sandoval',
    show: 'Vanderpump Rules',
    showId: 'vpr',
    xHandle: 'TomSandoval',
    instagram: 'tomsandoval',
    image: 'https://via.placeholder.com/200/E50914/FFFFFF?text=TS',
    dramaScore: 8.8,
    status: 'active',
    season: 'OG',
    relationships: [
      { targetId: 'lisa-vanderpump', type: 'frenemies' },
      { targetId: 'ariana-madix', type: 'ex', since: '2023' },
    ]
  },
  {
    id: 'ariana-madix',
    name: 'Ariana Madix',
    show: 'Vanderpump Rules',
    showId: 'vpr',
    xHandle: 'Ariana2525',
    instagram: 'ariana2525',
    image: 'https://via.placeholder.com/200/E50914/FFFFFF?text=AM',
    dramaScore: 7.5,
    status: 'active',
    season: 'S3',
    relationships: [
      { targetId: 'tom-sandoval', type: 'ex', since: '2023' },
    ]
  },
  {
    id: 'james-kennedy',
    name: 'James Kennedy',
    show: 'Vanderpump Rules',
    showId: 'vpr',
    xHandle: 'itsjameskennedy',
    instagram: 'itsjameskennedy',
    image: 'https://via.placeholder.com/200/E50914/FFFFFF?text=JK',
    dramaScore: 7.8,
    status: 'active',
    season: 'S3',
    relationships: [
      { targetId: 'lala-kent', type: 'ex', since: '2017' },
    ]
  },
  {
    id: 'lala-kent',
    name: 'Lala Kent',
    show: 'Vanderpump Rules',
    showId: 'vpr',
    xHandle: 'lalakent',
    instagram: 'lalakent',
    image: 'https://via.placeholder.com/200/E50914/FFFFFF?text=LK',
    dramaScore: 8.5,
    status: 'active',
    season: 'S4',
    relationships: [
      { targetId: 'james-kennedy', type: 'ex', since: '2017' },
    ]
  },

  // Summer House
  {
    id: 'kyle-cooke',
    name: 'Kyle Cooke',
    show: 'Summer House',
    showId: 'poll',
    xHandle: 'imkylecooke',
    instagram: 'imkylecooke',
    image: 'https://via.placeholder.com/200/FF6B35/FFFFFF?text=KC',
    dramaScore: 6.9,
    status: 'active',
    season: 'S1',
    relationships: [
      { targetId: 'lindsay-hubbard', type: 'frenemies' },
    ]
  },
  {
    id: 'lindsay-hubbard',
    name: 'Lindsay Hubbard',
    show: 'Summer House',
    showId: 'poll',
    xHandle: 'lindshubbs',
    instagram: 'lindshubbs',
    image: 'https://via.placeholder.com/200/FF6B35/FFFFFF?text=LH',
    dramaScore: 7.2,
    status: 'active',
    season: 'S1',
    relationships: [
      { targetId: 'carl-radke', type: 'ex', since: '2023' },
    ]
  },
  {
    id: 'carl-radke',
    name: 'Carl Radke',
    show: 'Summer House',
    showId: 'poll',
    xHandle: 'carlradke',
    instagram: 'carlradke',
    image: 'https://via.placeholder.com/200/FF6B35/FFFFFF?text=CR',
    dramaScore: 6.5,
    status: 'active',
    season: 'S1',
    relationships: [
      { targetId: 'lindsay-hubbard', type: 'ex', since: '2023' },
    ]
  },
  {
    id: 'paige-desorbo',
    name: 'Paige DeSorbo',
    show: 'Summer House',
    showId: 'poll',
    xHandle: 'paige_desorbo',
    instagram: 'paige_desorbo',
    image: 'https://via.placeholder.com/200/FF6B35/FFFFFF?text=PD',
    dramaScore: 7.1,
    status: 'active',
    season: 'S3',
    relationships: []
  },

  // Southern Charm
  {
    id: 'shep-rose',
    name: 'Shep Rose',
    show: 'Southern Charm',
    showId: 'southerncharm',
    xHandle: 'ShepRose',
    instagram: 'sheprevens',
    image: 'https://via.placeholder.com/200/9B59B6/FFFFFF?text=SR',
    dramaScore: 6.5,
    status: 'active',
    season: 'S1',
    relationships: [
      { targetId: 'craig-conover', type: 'frenemies' },
    ]
  },
  {
    id: 'craig-conover',
    name: 'Craig Conover',
    show: 'Southern Charm',
    showId: 'southerncharm',
    xHandle: 'CraigConover',
    instagram: 'caconover',
    image: 'https://via.placeholder.com/200/9B59B6/FFFFFF?text=CC',
    dramaScore: 7.0,
    status: 'active',
    season: 'S1',
    relationships: [
      { targetId: 'shep-rose', type: 'frenemies' },
      { targetId: 'naomie-olindo', type: 'ex' },
    ]
  },
  {
    id: 'naomie-olindo',
    name: 'Naomie Olindo',
    show: 'Southern Charm',
    showId: 'southerncharm',
    xHandle: 'naomie_olindo',
    instagram: 'naomieolindo',
    image: 'https://via.placeholder.com/200/9B59B6/FFFFFF?text=NO',
    dramaScore: 7.2,
    status: 'active',
    season: 'S3',
    relationships: [
      { targetId: 'craig-conover', type: 'ex' },
    ]
  },
  {
    id: 'austen-kroll',
    name: 'Austen Kroll',
    show: 'Southern Charm',
    showId: 'southerncharm',
    xHandle: 'AustenKroll',
    instagram: 'austenkroll',
    image: 'https://via.placeholder.com/200/9B59B6/FFFFFF?text=AK',
    dramaScore: 7.4,
    status: 'active',
    season: 'S4',
    relationships: [
      { targetId: 'madison-lecroy', type: 'ex' },
    ]
  },
  {
    id: 'madison-lecroy',
    name: 'Madison LeCroy',
    show: 'Southern Charm',
    showId: 'southerncharm',
    xHandle: 'madisonlecroy',
    instagram: 'madison.lecroy',
    image: 'https://via.placeholder.com/200/9B59B6/FFFFFF?text=ML',
    dramaScore: 7.6,
    status: 'active',
    season: 'S6',
    relationships: [
      { targetId: 'austen-kroll', type: 'ex' },
    ]
  },

  // RHOBH
  {
    id: 'kyle-richards',
    name: 'Kyle Richards',
    show: 'Real Housewives of Beverly Hills',
    showId: 'rhobh',
    xHandle: 'KyleRichards',
    instagram: 'kylerichards18',
    image: 'https://via.placeholder.com/200/FFC0CB/000000?text=KR',
    dramaScore: 8.2,
    status: 'active',
    season: 'S1',
    relationships: [
      { targetId: 'dorit-kemsley', type: 'frenemies' },
      { targetId: 'erika-jayne', type: 'friends' },
    ]
  },
  {
    id: 'dorit-kemsley',
    name: 'Dorit Kemsley',
    show: 'Real Housewives of Beverly Hills',
    showId: 'rhobh',
    xHandle: 'doritkemsley',
    instagram: 'doritkemsley',
    image: 'https://via.placeholder.com/200/FFC0CB/000000?text=DK',
    dramaScore: 7.8,
    status: 'active',
    season: 'S7',
    relationships: [
      { targetId: 'kyle-richards', type: 'frenemies' },
    ]
  },
  {
    id: 'erika-jayne',
    name: 'Erika Jayne',
    show: 'Real Housewives of Beverly Hills',
    showId: 'rhobh',
    xHandle: 'erikajayne',
    instagram: 'theprettymess',
    image: 'https://via.placeholder.com/200/FFC0CB/000000?text=EJ',
    dramaScore: 8.0,
    status: 'active',
    season: 'S6',
    relationships: [
      { targetId: 'kyle-richards', type: 'friends' },
    ]
  },
  {
    id: 'garcelle-beauvais',
    name: 'Garcelle Beauvais',
    show: 'Real Housewives of Beverly Hills',
    showId: 'rhobh',
    xHandle: 'GarcelleB',
    instagram: 'garcelle',
    image: 'https://via.placeholder.com/200/FFC0CB/000000?text=GB',
    dramaScore: 7.5,
    status: 'active',
    season: 'S10',
    relationships: []
  },

  // RHOSLC
  {
    id: 'heather-gay',
    name: 'Heather Gay',
    show: 'Real Housewives of Salt Lake City',
    showId: 'rhoslc',
    xHandle: 'heathergay29',
    instagram: 'heathergay',
    image: 'https://via.placeholder.com/200/00CED1/FFFFFF?text=HG',
    dramaScore: 7.4,
    status: 'active',
    season: 'S1',
    relationships: []
  },
  {
    id: 'whitney-rose',
    name: 'Whitney Rose',
    show: 'Real Housewives of Salt Lake City',
    showId: 'rhoslc',
    xHandle: 'whitneywildrose',
    instagram: 'whitneywildrose',
    image: 'https://via.placeholder.com/200/00CED1/FFFFFF?text=WR',
    dramaScore: 7.1,
    status: 'active',
    season: 'S1',
    relationships: []
  },
  {
    id: 'meredith-marks',
    name: 'Meredith Marks',
    show: 'Real Housewives of Salt Lake City',
    showId: 'rhoslc',
    xHandle: 'MeredithMarks',
    instagram: 'meredithmarks',
    image: 'https://via.placeholder.com/200/00CED1/FFFFFF?text=MM',
    dramaScore: 7.0,
    status: 'active',
    season: 'S1',
    relationships: []
  },

  // Mormon Wives
  {
    id: 'miranda-mcveigh',
    name: 'Miranda McVeigh',
    show: 'Secret Lives of Mormon Wives',
    showId: 'mormonwives',
    xHandle: 'miranda_mcveigh',
    instagram: 'miranda.mcveigh',
    image: 'https://via.placeholder.com/200/FFD700/000000?text=MM',
    dramaScore: 8.5,
    status: 'active',
    season: 'S1',
    relationships: []
  },
  {
    id: 'demi-engemann',
    name: 'Demi Engemann',
    show: 'Secret Lives of Mormon Wives',
    showId: 'mormonwives',
    xHandle: 'demiengemann',
    instagram: 'demiengemann',
    image: 'https://via.placeholder.com/200/FFD700/000000?text=DE',
    dramaScore: 8.2,
    status: 'active',
    season: 'S1',
    relationships: []
  },
  {
    id: 'jen-ferrari',
    name: 'Jen Ferrari',
    show: 'Secret Lives of Mormon Wives',
    showId: 'mormonwives',
    xHandle: 'jenferrariofficial',
    instagram: 'jenferrariofficial',
    image: 'https://via.placeholder.com/200/FFD700/000000?text=JF',
    dramaScore: 8.0,
    status: 'active',
    season: 'S1',
    relationships: []
  },
]

// Helper functions
export const getCastByShow = (showId: string) => CAST_DB.filter(c => c.showId === showId)

export const getCastById = (id: string) => CAST_DB.find(c => c.id === id)

export const getActiveShows = () => SHOWS

export const getAllXHandles = () => CAST_DB.filter(c => c.xHandle).map(c => c.xHandle as string)

export const getTrendingCast = (limit = 5) => CAST_DB
  .filter(c => c.status === 'active')
  .sort((a, b) => b.dramaScore - a.dramaScore)
  .slice(0, limit)