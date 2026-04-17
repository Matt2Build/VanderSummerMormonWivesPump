'use client'

import { useEffect, useState } from 'react'

interface Prediction {
  id: string
  question: string
  category: string
  deadline: string
  yesVotes: number
  noVotes: number
  userVoted?: 'yes' | 'no'
}

interface LeaderboardEntry {
  rank: number
  username: string
  correct: number
  total: number
  streak: number
}

export function PredictionPools() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [activeTab, setActiveTab] = useState<'open' | 'leaderboard'>('open')

  useEffect(() => {
    fetch('/api/predictions')
      .then(res => res.json())
      .then(data => {
        setPredictions(data.predictions || [])
        setLeaderboard(data.leaderboard || [])
      })
  }, [])

  const handleVote = (predictionId: string, vote: 'yes' | 'no') => {
    fetch('/api/predictions/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ predictionId, vote })
    })
    setPredictions(prev => prev.map(p => 
      p.id === predictionId 
        ? { ...p, userVoted: vote, [vote + 'Votes']: p[vote + 'Votes' as 'yesVotes' | 'noVotes'] + 1 }
        : p
    ))
  }

  return (
    <div className="bg-drama-gray rounded-lg">
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('open')}
          className={`flex-1 py-3 text-sm font-medium transition ${
            activeTab === 'open' ? 'text-white border-b-2 border-drama-red' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Open Predictions
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-3 text-sm font-medium transition ${
            activeTab === 'leaderboard' ? 'text-white border-b-2 border-drama-red' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          Leaderboard
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'open' ? (
          predictions.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No active predictions. Check back after episodes air!</p>
          ) : (
            <div className="space-y-4">
              {predictions.map(prediction => {
                const total = prediction.yesVotes + prediction.noVotes
                const yesPercent = total > 0 ? (prediction.yesVotes / total) * 100 : 50
                
                return (
                  <div key={prediction.id} className="border border-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs text-drama-red uppercase tracking-wide">{prediction.category}</span>
                        <h4 className="text-white font-medium mt-1">{prediction.question}</h4>
                        <p className="text-xs text-gray-500 mt-1">Results: {prediction.deadline}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden flex">
                        <div className="h-full bg-green-500" style={{ width: `${yesPercent}%` }} />
                        <div className="h-full bg-red-500" style={{ width: `${100 - yesPercent}%` }} />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>🔥 {prediction.yesVotes} Yes</span>
                      <span>❄️ {prediction.noVotes} No</span>
                    </div>
                    
                    {!prediction.userVoted ? (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleVote(prediction.id, 'yes')}
                          className="flex-1 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition"
                        >
                          Vote Yes
                        </button>
                        <button
                          onClick={() => handleVote(prediction.id, 'no')}
                          className="flex-1 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                        >
                          Vote No
                        </button>
                      </div>
                    ) : (
                      <p className="mt-3 text-xs text-center text-gray-500">
                        You voted: <span className={prediction.userVoted === 'yes' ? 'text-green-400' : 'text-red-400'}>
                          {prediction.userVoted.toUpperCase()}
                        </span>
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )
        ) : (
          leaderboard.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No predictions resolved yet. Leaderboard coming soon!</p>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry, i) => (
                <div key={entry.username} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <span className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                    i === 0 ? 'bg-yellow-500 text-black' :
                    i === 1 ? 'bg-gray-400 text-black' :
                    i === 2 ? 'bg-amber-700 text-white' :
                    'bg-white/10 text-gray-400'
                  }`}>
                    {entry.rank}
                  </span>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">@{entry.username}</p>
                    <p className="text-xs text-gray-500">{entry.correct}/{entry.total} correct</p>
                  </div>
                  {entry.streak > 2 && (
                    <span className="text-xs text-orange-400">🔥 {entry.streak}</span>
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}
