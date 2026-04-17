import { NextResponse } from 'next/server'

const DRAMA_SCORES = [
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

export async function GET() {
  return NextResponse.json({ scores: DRAMA_SCORES })
}
