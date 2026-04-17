// Static data for reality TV cast and drama
// In production, this would come from X API, YouTube API, and a database

export const CAST_DB = [
  {
    id: 'lisa-vanderpump',
    name: 'Lisa Vanderpump',
    show: 'Vanderpump Rules',
    image: 'https://via.placeholder.com/100/E50914/FFFFFF?text=LV',
    dramaScore: 9.2,
    relationships: [
      { targetId: 'tom-sandoval', type: 'feud' as const },
      { targetId: 'ariana-madix', type: 'friends' as const },
    ]
  },
  {
    id: 'tom-sandoval',
    name: 'Tom Sandoval',
    show: 'Vanderpump Rules',
    image: 'https://via.placeholder.com/100/E50914/FFFFFF?text=TS',
    dramaScore: 8.8,
    relationships: [
      { targetId: 'lisa-vanderpump', type: 'feud' as const },
      { targetId: 'ariana-madix', type: 'ex' as const },
    ]
  },
  {
    id: 'ariana-madix',
    name: 'Ariana Madix',
    show: 'Vanderpump Rules',
    image: 'https://via.placeholder.com/100/E50914/FFFFFF?text=AM',
    dramaScore: 7.5,
    relationships: [
      { targetId: 'tom-sandoval', type: 'ex' as const },
      { targetId: 'lisa-vanderpump', type: 'friends' as const },
    ]
  },
  {
    id: 'kyle-cooke',
    name: 'Kyle Cooke',
    show: 'Summer House',
    image: 'https://via.placeholder.com/100/FF6B35/FFFFFF?text=KC',
    dramaScore: 6.9,
    relationships: [
      { targetId: 'lindsay-hubbard', type: 'feud' as const },
    ]
  },
  {
    id: 'lindsay-hubbard',
    name: 'Lindsay Hubbard',
    show: 'Summer House',
    image: 'https://via.placeholder.com/100/FF6B35/FFFFFF?text=LH',
    dramaScore: 7.2,
    relationships: [
      { targetId: 'kyle-cooke', type: 'feud' as const },
    ]
  },
  {
    id: 'shep-rose',
    name: 'Shep Rose',
    show: 'Southern Charm',
    image: 'https://via.placeholder.com/100/9B59B6/FFFFFF?text=SR',
    dramaScore: 6.5,
    relationships: [],
  },
]

export const DRAMA_SCORES = [
  {
    castMemberId: 'lisa-vanderpump',
    name: 'Lisa Vanderpump',
    show: 'Vanderpump Rules',
    currentScore: 9.2,
    change24h: 0.3,
    trending: 'up' as const,
  },
  {
    castMemberId: 'tom-sandoval',
    name: 'Tom Sandoval',
    show: 'Vanderpump Rules',
    currentScore: 8.8,
    change24h: -0.5,
    trending: 'down' as const,
  },
  {
    castMemberId: 'ariana-madix',
    name: 'Ariana Madix',
    show: 'Vanderpump Rules',
    currentScore: 7.5,
    change24h: 0.8,
    trending: 'up' as const,
  },
  {
    castMemberId: 'kyle-cooke',
    name: 'Kyle Cooke',
    show: 'Summer House',
    currentScore: 6.9,
    change24h: 0.1,
    trending: 'stable' as const,
  },
  {
    castMemberId: 'lindsay-hubbard',
    name: 'Lindsay Hubbard',
    show: 'Summer House',
    currentScore: 7.2,
    change24h: 0.4,
    trending: 'up' as const,
  },
  {
    castMemberId: 'shep-rose',
    name: 'Shep Rose',
    show: 'Southern Charm',
    currentScore: 6.5,
    change24h: -0.2,
    trending: 'down' as const,
  },
]

export const PREDICTIONS = [
  {
    id: 'pred-1',
    question: 'Will Tom Sandoval get fired before the reunion?',
    category: 'Vanderpump Rules',
    deadline: '2024-05-15',
    yesVotes: 234,
    noVotes: 89,
  },
  {
    id: 'pred-2',
    question: 'Will Lindsay and Carl get back together?',
    category: 'Summer House',
    deadline: '2024-06-01',
    yesVotes: 156,
    noVotes: 312,
  },
  {
    id: 'pred-3',
    question: 'Will Shep settle down this season?',
    category: 'Southern Charm',
    deadline: '2024-05-30',
    yesVotes: 45,
    noVotes: 567,
  },
]

export const LEADERBOARD = [
  { rank: 1, username: 'bravo_addict', correct: 47, total: 52, streak: 8 },
  { rank: 2, username: 'pumprules_fan', correct: 45, total: 50, streak: 5 },
  { rank: 3, username: 'housewives_hive', correct: 42, total: 48, streak: 3 },
  { rank: 4, username: 'summerhouse_stan', correct: 38, total: 45, streak: 0 },
  { rank: 5, username: 'reality_tea', correct: 35, total: 40, streak: 2 },
]

export const FEED_POSTS = [
  {
    id: '1',
    platform: 'x' as const,
    author: 'BravoTV',
    content: '🍸 The Vanderpump Rules reunion trailer just dropped and WOW. Don\'t miss it Sunday at 9/8c!',
    timestamp: '2h ago',
    engagement: 15420,
    url: 'https://x.com/BravoTV'
  },
  {
    id: '2',
    platform: 'x' as const,
    author: 'LisaVanderpump',
    content: 'Some people just can\'t handle the truth... 💎',
    timestamp: '4h ago',
    engagement: 8932,
    url: 'https://x.com/LisaVanderpump'
  },
  {
    id: '3',
    platform: 'youtube' as const,
    author: 'WatchWhatHappensLive',
    content: 'NEW: Tom Sandoval breaks down in exclusive interview with Andy Cohen',
    timestamp: '5h ago',
    engagement: 45600,
    url: 'https://youtube.com/watch?v=example'
  },
  {
    id: '4',
    platform: 'x' as const,
    author: 'SummerHouse',
    content: 'Things are heating up in the Hamptons. New episode tonight! 🌞',
    timestamp: '6h ago',
    engagement: 5431,
    url: 'https://x.com/SummerHouse'
  },
  {
    id: '5',
    platform: 'x' as const,
    author: 'SouthernCharm',
    content: 'Shep\'s apology tour continues... what do y\'all think? 👀',
    timestamp: '8h ago',
    engagement: 3201,
    url: 'https://x.com/SouthernCharm'
  },
]
