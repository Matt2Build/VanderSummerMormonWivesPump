import { NextResponse } from 'next/server'

const CAST_DB = [
  {
    id: 'lisa-vanderpump',
    name: 'Lisa Vanderpump',
    show: 'Vanderpump Rules',
    image: 'https://via.placeholder.com/100?text=LV',
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
    image: 'https://via.placeholder.com/100?text=TS',
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
    image: 'https://via.placeholder.com/100?text=AM',
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
    image: 'https://via.placeholder.com/100?text=KC',
    dramaScore: 6.9,
    relationships: [
      { targetId: 'lindsay-hubbard', type: 'feud' as const },
    ]
  },
  {
    id: 'lindsay-hubbard',
    name: 'Lindsay Hubbard',
    show: 'Summer House',
    image: 'https://via.placeholder.com/100?text=LH',
    dramaScore: 7.2,
    relationships: [
      { targetId: 'kyle-cooke', type: 'feud' as const },
    ]
  },
  {
    id: 'shep-rose',
    name: 'Shep Rose',
    show: 'Southern Charm',
    image: 'https://via.placeholder.com/100?text=SR',
    dramaScore: 6.5,
    relationships: [],
  },
]

export async function GET() {
  return NextResponse.json({ cast: CAST_DB })
}
