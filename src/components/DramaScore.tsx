'use client'

import { useEffect, useState } from 'react'

interface ScoreEntry {
  castMemberId: string
  name: string
  show: string
  currentScore: number
  change24h: number
  trending: 'up' | 'down' | 'stable'
}

export function DramaScore() {
  const [scores, setScores] = useState<ScoreEntry[]>([])

  useEffect(() => {
    fetch('/api/drama-scores')
      .then(res => res.json())
      .then(data => setScores(data.scores || []))
  }, [])

  if (scores.length === 0) {
    return (
      <div className="bg-drama-gray rounded-lg p-6 text-center">
        <p className="text-gray-400 text-sm">Drama scores loading...</p>
      </div>
    )
  }

  const sorted = [...scores].sort((a, b) => b.currentScore - a.currentScore)

  return (
    <div className="bg-drama-gray rounded-lg p-4 space-y-3">
      {sorted.slice(0, 5).map((entry, i) => (
        <div key={entry.castMemberId} className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-500 w-6">{i + 1}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">{entry.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{entry.show}</span>
                {entry.trending === 'up' && <span className="text-green-400 text-xs">↗</span>}
                {entry.trending === 'down' && <span className="text-red-400 text-xs">↘</span>}
                {entry.trending === 'stable' && <span className="text-gray-500 text-xs">→</span>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    entry.currentScore >= 8 ? 'bg-drama-red' :
                    entry.currentScore >= 5 ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${entry.currentScore * 10}%` }}
                />
              </div>
              <span className={`text-xs font-bold w-8 text-right ${
                entry.currentScore >= 8 ? 'text-drama-red' :
                entry.currentScore >= 5 ? 'text-orange-400' :
                'text-yellow-400'
              }`}>
                {entry.currentScore}
              </span>
            </div>
            {entry.change24h !== 0 && (
              <p className={`text-[10px] mt-1 ${
                entry.change24h > 0 ? 'text-red-400' : 'text-green-400'
              }`}>
                {entry.change24h > 0 ? '+' : ''}{entry.change24h} in 24h
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
