'use client'

import { useState } from 'react'

interface Episode {
  id: string
  show: string
  season: number
  episode: number
  title: string
  airDate: string
  highlights: string[]
  watched: boolean
}

const EPISODES: Episode[] = [
  {
    id: '1',
    show: 'Vanderpump Rules',
    season: 11,
    episode: 10,
    title: 'The Reunion Part 1',
    airDate: '2024-05-14',
    highlights: ['Tom faces the group', 'Ariana\'s clapback', 'Lisa\'s disappointment'],
    watched: false
  },
  {
    id: '2',
    show: 'Summer House',
    season: 8,
    episode: 15,
    title: 'Summer\'s End',
    airDate: '2024-05-16',
    highlights: ['Kyle & Amanda tension', 'Lindsay\'s new guy', 'Paige\s revelation'],
    watched: false
  },
  {
    id: '3',
    show: 'Real Housewives of Beverly Hills',
    season: 14,
    episode: 20,
    title: 'Reunion Part 2',
    airDate: '2024-04-30',
    highlights: ['Kyle vs Dorit', 'Erika\'s tears', 'Garcelle\'s read'],
    watched: false
  },
]

export function EpisodeTracker() {
  const [episodes, setEpisodes] = useState<Episode[]>(EPISODES)
  const [filter, setFilter] = useState<'upcoming' | 'aired' | 'all'>('all')

  const toggleWatched = (id: string) => {
    setEpisodes(prev => prev.map(ep => 
      ep.id === id ? { ...ep, watched: !ep.watched } : ep
    ))
  }

  const filtered = episodes.filter(ep => {
    if (filter === 'upcoming') return new Date(ep.airDate) > new Date()
    if (filter === 'aired') return new Date(ep.airDate) <= new Date()
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['all', 'upcoming', 'aired'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-xs rounded capitalize ${
              filter === f ? 'bg-drama-red text-white' : 'bg-white/10 text-gray-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(ep => (
          <div key={ep.id} className={`bg-drama-gray rounded-lg p-3 ${ep.watched ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-drama-red/20 text-drama-red px-1.5 py-0.5 rounded">
                    S{ep.season}E{ep.episode}
                  </span>
                  <span className="text-[10px] text-gray-500">{ep.airDate}</span>
                </div>
                <h4 className="text-sm font-medium text-white mb-1">{ep.title}</h4>
                <p className="text-[10px] text-gray-500">{ep.show}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {ep.highlights.map((h, i) => (
                    <span key={i} className="text-[9px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => toggleWatched(ep.id)}
                className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                  ep.watched ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400'
                }`}
              >
                ✓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
