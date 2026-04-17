'use client'

import { useState } from 'react'
import { Calendar, Check, Clock, Tv } from 'lucide-react'

interface Episode {
  id: string
  show: string
  season: number
  episode: number
  title: string
  airDate: string
  airTime: string
  highlights: string[]
  watched: boolean
  network: string
}

const EPISODES: Episode[] = [
  {
    id: '1',
    show: 'Real Housewives of Beverly Hills',
    season: 15,
    episode: 18,
    title: 'Reunion Part 1',
    airDate: '2026-04-16',
    airTime: '8:00 PM',
    highlights: ['Kyle confronts Dorit', 'Erika breaks down', 'Andy presses Kyle'],
    watched: false,
    network: 'Bravo'
  },
  {
    id: '2',
    show: 'Summer House',
    season: 9,
    episode: 4,
    title: 'The New Normal',
    airDate: '2026-04-17',
    airTime: '9:00 PM',
    highlights: ['Kyle moves out', 'New romance for Lindsay', 'Paige faces Craig'],
    watched: false,
    network: 'Bravo'
  },
  {
    id: '3',
    show: 'Secret Lives of Mormon Wives',
    season: 2,
    episode: 1,
    title: 'Secrets Never Sleep',
    airDate: '2026-04-18',
    airTime: '12:00 AM',
    highlights: ['Miranda vs Demi', 'New cast member', 'The truth comes out'],
    watched: false,
    network: 'Hulu'
  },
  {
    id: '4',
    show: 'Southern Charm',
    season: 10,
    episode: 12,
    title: 'Patriarchs and Problems',
    airDate: '2026-04-17',
    airTime: '8:00 PM',
    highlights: ['Shep family drama', 'Craig business launch', 'Naomie returns'],
    watched: false,
    network: 'Bravo'
  },
  {
    id: '5',
    show: 'Vanderpump Rules',
    season: 12,
    episode: 2,
    title: 'New Rules',
    airDate: '2026-04-21',
    airTime: '8:00 PM',
    highlights: ['New cast shakeup', 'Lisa confronts Tom', 'Ariana moves on'],
    watched: false,
    network: 'Bravo'
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

  const isAired = (airDate: string) => new Date(airDate) <= new Date()

  const filtered = episodes.filter(ep => {
    if (filter === 'upcoming') return !isAired(ep.airDate)
    if (filter === 'aired') return isAired(ep.airDate)
    return true
  }).sort((a, b) => new Date(a.airDate).getTime() - new Date(b.airDate).getTime())

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-1 bg-white/50 rounded-xl p-1">
        {(['all', 'upcoming', 'aired'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
              filter === f ? 'bg-white shadow-sm text-charcoal-900' : 'text-gray-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Episodes */}
      <div className="space-y-3">
        {filtered.map(ep => {
          const aired = isAired(ep.airDate)
          return (
            <div 
              key={ep.id} 
              className={`rounded-xl p-3 border transition-all ${
                ep.watched 
                  ? 'bg-green-50/50 border-green-200' 
                  : 'bg-white/60 border-white/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      ep.network === 'Bravo' ? 'bg-blush-200 text-blush-700' : 'bg-green-200 text-green-700'
                    }`}>
                      {ep.network}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      S{ep.season}E{ep.episode}
                    </span>
                  </div>
                  <h4 className="font-semibold text-charcoal-900 text-sm mb-0.5">{ep.title}</h4>
                  <p className="text-[10px] text-gray-500 mb-1">{ep.show}</p>
                  
                  {/* Air Date */}
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-2">
                    {aired ? (
                      <>
                        <Calendar className="w-3 h-3" />
                        {ep.airDate === new Date().toISOString().split('T')[0] ? 'Today' : ep.airDate}
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        {ep.airDate} at {ep.airTime}
                      </>
                    )}
                  </div>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1">
                    {ep.highlights.map((h, i) => (
                      <span key={i} className="text-[9px] bg-blush-50 text-blush-700 px-1.5 py-0.5 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Watch Toggle */}
                <button
                  onClick={() => toggleWatched(ep.id)}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    ep.watched 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/70 text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
        
        {filtered.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Tv className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No episodes found</p>
          </div>
        )}
      </div>
    </div>
  )
}
