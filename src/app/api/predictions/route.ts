import { NextResponse } from 'next/server'

const PREDICTIONS = [
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

const LEADERBOARD = [
  { rank: 1, username: 'bravo_addict', correct: 47, total: 52, streak: 8 },
  { rank: 2, username: 'pumprules_fan', correct: 45, total: 50, streak: 5 },
  { rank: 3, username: 'housewives_hive', correct: 42, total: 48, streak: 3 },
  { rank: 4, username: 'summerhouse_stan', correct: 38, total: 45, streak: 0 },
  { rank: 5, username: 'reality_tea', correct: 35, total: 40, streak: 2 },
]

export async function GET() {
  return NextResponse.json({ predictions: PREDICTIONS, leaderboard: LEADERBOARD })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { predictionId, vote } = body
  
  // In production, this would update a database
  return NextResponse.json({ success: true, predictionId, vote })
}
