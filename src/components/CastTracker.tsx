'use client'

import { useEffect, useState, useMemo } from 'react'
import { CAST_DB, SHOWS, CastMember } from '@/lib/castDatabase'

export function CastTracker() {
  const [cast, setCast] = useState<CastMember[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedShow, setSelectedShow] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'drama' | 'name' | 'show'>('drama')

  useEffect(() => {
    setCast(CAST_DB)
  }, [])

  const filteredCast = useMemo(() => {
    let filtered = selectedShow === 'all' ? cast : cast.filter(c => c.showId === selectedShow)
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'drama') return b.dramaScore - a.dramaScore
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return a.show.localeCompare(b.show)
    })
  }, [cast, selectedShow, sortBy])

  if (cast.length === 0) {
    return (
      <div className="bg-drama-gray rounded-lg p-6 text-center">
        <p className="text-gray-400 text-sm">Loading cast database...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedShow('all')}
          className={`px-2 py-1 text-xs rounded ${selectedShow === 'all' ? 'bg-drama-red text-white' : 'bg-white/10 text-gray-400'}`}
        >
          All Shows
        </button>
        {SHOWS.map(show => (
          <button
            key={show.id}
            onClick={() => setSelectedShow(show.id)}
            className={`px-2 py-1 text-xs rounded ${
              selectedShow === show.id ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            style={{ 
              backgroundColor: selectedShow === show.id ? show.color : 'rgba(255,255,255,0.1)',
              color: selectedShow === show.id ? (show.id === 'vpr' || show.id === 'southerncharm' ? 'white' : 'black') : undefined
            }}
          >
            {show.name.split(' ').slice(0, 2).join(' ')}
          </button>
        ))}
      </div>
      
      {/* Sort */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-500">Sort:</span>
        {(['drama', 'name', 'show'] as const).map(opt => (
          <button
            key={opt}
            onClick={() => setSortBy(opt)}
            className={`capitalize ${sortBy === opt ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Cast Grid */}
      <div className="bg-drama-gray rounded-lg p-4">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {filteredCast.map(member => (
            <button
              key={member.id}
              onClick={() => setSelected(selected === member.id ? null : member.id)}
              className={`relative aspect-square rounded-lg overflow-hidden transition transform hover:scale-105 ${
                selected === member.id ? 'ring-2 ring-drama-red' : ''
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-1 left-1 right-1">
                <p className="text-[10px] font-semibold text-white truncate leading-tight">{member.name.split(' ')[0]}</p>
                <p className="text-[8px] text-gray-400 truncate">{member.show.split(' ').slice(0, 2).join(' ')}</p>
              </div>
              {member.dramaScore >= 8 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-drama-red rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
        
        {/* Selected Cast Detail */}
        {selected && (
          <div className="border-t border-white/10 pt-4">
            {(() => {
              const member = cast.find(c => c.id === selected)
              if (!member) return null
              return (
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={member.image} alt={member.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{member.name}</h3>
                      <p className="text-xs text-gray-400">{member.show}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {member.xHandle && (
                          <a 
                            href={`https://x.com/${member.xHandle}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-400 hover:underline"
                          >
                            @{member.xHandle}
                          </a>
                        )}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          member.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          member.status === 'recurring' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-400">Drama Score:</span>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-drama-red"
                        style={{ width: `${member.dramaScore * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-drama-red">{member.dramaScore}/10</span>
                  </div>
                  
                  {member.relationships.length > 0 && (
                    <div className="text-xs">
                      <p className="text-gray-400 mb-1">Relationships:</p>
                      <ul className="space-y-1">
                        {member.relationships.map((rel, i) => {
                          const target = cast.find(c => c.id === rel.targetId)
                          if (!target) return null
                          return (
                            <li key={i} className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${
                                rel.type === 'dating' ? 'bg-pink-500' :
                                rel.type === 'engaged' ? 'bg-purple-500' :
                                rel.type === 'married' ? 'bg-blue-500' :
                                rel.type === 'ex' ? 'bg-red-500' :
                                rel.type === 'feud' ? 'bg-orange-500' :
                                rel.type === 'frenemies' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`} />
                              <span className="text-gray-300 capitalize">{rel.type}</span>
                              <span className="text-white">{target.name}</span>
                              {rel.since && <span className="text-gray-500">(since {rel.since})</span>}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
        
        {!selected && (
          <p className="text-center text-gray-500 text-xs py-2">
            {filteredCast.length} cast members • Click for details
          </p>
        )}
      </div>
    </div>
  )
}
