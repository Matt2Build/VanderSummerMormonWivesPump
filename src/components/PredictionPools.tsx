'use client'

import { useEffect, useState } from 'react'
import { Clock, Users, Trophy, Info, TrendingUp, AlertCircle } from 'lucide-react'

interface Prediction {
  id: string
  question: string
  description: string
  category: string
  show: string
  deadline: string
  timeRemaining: string
  yesVotes: number
  noVotes: number
  userVoted?: 'yes' | 'no'
  odds: {
    yes: number
    no: number
  }
  totalBets: number
}

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  correct: number
  total: number
  streak: number
  winRate: number
}

const PREDICTIONS: Prediction[] = [
  {
    id: 'pred-1',
    question: 'Will Tom Sandoval appear on WWHL this month?',
    description: 'Andy Cohen books Sandoval for a one-on-one interview before May 1st',
    category: 'Appearance',
    show: 'Vanderpump Rules',
    deadline: '2026-04-30',
    timeRemaining: '13 days',
    yesVotes: 342,
    noVotes: 89,
    odds: { yes: 1.25, no: 3.50 },
    totalBets: 431
  },
  {
    id: 'pred-2',
    question: 'Will Kyle & Amanda reconcile?',
    description: 'The recently divorced couple gets back together before Summer House S10 finale',
    category: 'Relationship',
    show: 'Summer House',
    deadline: '2026-06-15',
    timeRemaining: '58 days',
    yesVotes: 156,
    noVotes: 512,
    odds: { yes: 4.20, no: 1.15 },
    totalBets: 668
  },
  {
    id: 'pred-3',
    question: 'Will Dorit leave RHOBH?',
    description: 'Dorit announces she is not returning for Season 16',
    category: 'Cast Change',
    show: 'RHOBH',
    deadline: '2026-05-01',
    timeRemaining: '14 days',
    yesVotes: 234,
    noVotes: 198,
    odds: { yes: 1.80, no: 2.00 },
    totalBets: 432
  },
  {
    id: 'pred-4',
    question: 'Shep gets engaged this season?',
    description: 'Shep Rose proposes or gets engaged during Southern Charm S10',
    category: 'Relationship',
    show: 'Southern Charm',
    deadline: '2026-05-30',
    timeRemaining: '43 days',
    yesVotes: 89,
    noVotes: 567,
    odds: { yes: 6.50, no: 1.05 },
    totalBets: 656
  },
]

const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, username: 'bravo_addict', avatar: 'B', correct: 47, total: 52, streak: 8, winRate: 90 },
  { rank: 2, username: 'pumprules_fan', avatar: 'P', correct: 45, total: 50, streak: 5, winRate: 90 },
  { rank: 3, username: 'housewives_hive', avatar: 'H', correct: 42, total: 48, streak: 3, winRate: 88 },
  { rank: 4, username: 'summerhouse_stan', avatar: 'S', correct: 38, total: 45, streak: 0, winRate: 84 },
  { rank: 5, username: 'reality_tea', avatar: 'R', correct: 35, total: 40, streak: 2, winRate: 88 },
]

export function PredictionPools() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [activeTab, setActiveTab] = useState<'open' | 'leaderboard'>('open')
  const [showInfo, setShowInfo] = useState(true)

  useEffect(() => {
    setPredictions(PREDICTIONS)
    setLeaderboard(LEADERBOARD)
  }, [])

  const handleVote = (predictionId: string, vote: 'yes' | 'no') => {
    setPredictions(prev => prev.map(p => 
      p.id === predictionId 
        ? { 
            ...p, 
            userVoted: vote, 
            [vote + 'Votes']: p[vote + 'Votes' as 'yesVotes' | 'noVotes'] + 1,
            totalBets: p.totalBets + 1
          }
        : p
    ))
  }

  return (
    <div className="space-y-4">
      {/* Info Banner */}
      {showInfo && (
        <div className="bg-champagne-50 border border-champagne-200 rounded-xl p-3 flex items-start gap-3">
          <Info className="w-5 h-5 text-champagne-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-champagne-800">
              <strong>No real money.</strong> Predictions use virtual points. Get them right, climb the leaderboard, earn bragging rights!
            </p>
          </div>
          <button onClick={() => setShowInfo(false)} className="text-champagne-400 hover:text-champagne-600">×</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-white/50 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('open')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'open' ? 'bg-white shadow-sm text-charcoal-900' : 'text-gray-500'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Open Predictions ({predictions.length})
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'leaderboard' ? 'bg-white shadow-sm text-charcoal-900' : 'text-gray-500'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Leaderboard
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'open' ? (
          predictions.length === 0 ? (
            <div className="card-glamour p-8 text-center">
              <p className="text-gray-500">No predictions open right now.</p>
            </div>
          ) : (
            predictions.map(prediction => {
              const total = prediction.yesVotes + prediction.noVotes
              const yesPercent = total > 0 ? (prediction.yesVotes / total) * 100 : 50
              
              return (
                <div key={prediction.id} className="card-glamour p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blush-100 text-blush-700 rounded-full uppercase tracking-wide">
                          {prediction.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{prediction.show}</span>
                      </div>
                      <h4 className="font-semibold text-charcoal-900 text-sm leading-snug">{prediction.question}</h4>
                      <p className="text-xs text-gray-500 mt-1">{prediction.description}</p>
                    </div>
                  </div>
                  
                  {/* Deadline */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Ends: {prediction.deadline}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertCircle className="w-3 h-3" />
                      {prediction.timeRemaining} left
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {prediction.totalBets} bets
                    </span>
                  </div>
                  
                  {/* Odds Display */}
                  {!prediction.userVoted && (
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-gray-500">YES Odds</p>
                        <p className="font-bold text-green-600">{prediction.odds.yes}x</p>
                      </div>
                      <div className="flex-1 bg-red-50 rounded-lg p-2 text-center">
                        <p className="text-[10px] text-gray-500">NO Odds</p>
                        <p className="font-bold text-red-600">{prediction.odds.no}x</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Vote Bar */}
                  <div className="mb-3">
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-green-400 rounded-l-full transition-all" style={{ width: `${yesPercent}%` }} />
                      <div className="h-full bg-red-400 rounded-r-full transition-all" style={{ width: `${100 - yesPercent}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] mt-1">
                      <span className="text-green-600">👍 {prediction.yesVotes} Yes</span>
                      <span className="text-red-600">{prediction.noVotes} No 👎</span>
                    </div>
                  </div>
                  
                  {/* Vote Buttons */}
                  {!prediction.userVoted ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVote(prediction.id, 'yes')}
                        className="flex-1 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        Bet YES
                      </button>
                      <button
                        onClick={() => handleVote(prediction.id, 'no')}
                        className="flex-1 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        Bet NO
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2 bg-blush-50 rounded-lg">
                      <p className="text-sm text-blush-700">
                        You predicted: <span className="font-bold uppercase">{prediction.userVoted}</span>
                      </p>
                      <p className="text-xs text-gray-500">Points locked until result</p>
                    </div>
                  )}
                </div>
              )
            })
          )
        ) : (
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div key={entry.username} className={`flex items-center gap-3 p-3 rounded-xl ${
                entry.rank <= 3 ? 'bg-gradient-to-r from-champagne-50 to-blush-50' : 'bg-white/50'
              }`}>
                <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                  entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  entry.rank === 2 ? 'bg-gray-300 text-gray-800' :
                  entry.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-white text-gray-400 border border-gray-200'
                }`}>
                  {entry.rank}
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush-200 to-champagne-200 flex items-center justify-center font-bold text-charcoal-700">
                  {entry.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-charcoal-900 text-sm">@{entry.username}</p>
                  <p className="text-xs text-gray-500">{entry.correct}/{entry.total} correct ({entry.winRate}%)</p>
                </div>
                {entry.streak > 0 && (
                  <span className="text-xs font-bold text-orange-500">🔥 {entry.streak}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
