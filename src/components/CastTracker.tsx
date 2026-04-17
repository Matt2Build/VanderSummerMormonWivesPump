'use client'

import { useEffect, useState } from 'react'

interface CastMember {
  id: string
  name: string
  show: string
  image: string
  dramaScore: number
  relationships: {
    targetId: string
    type: 'dating' | 'ex' | 'feud' | 'friends'
  }[]
}

export function CastTracker() {
  const [cast, setCast] = useState<CastMember[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/cast')
      .then(res => res.json())
      .then(data => setCast(data.cast || []))
  }, [])

  if (cast.length === 0) {
    return (
      <div className="bg-drama-gray rounded-lg p-6 text-center">
        <p className="text-gray-400 text-sm">Cast database loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-drama-gray rounded-lg p-4">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {cast.map(member => (
          <button
            key={member.id}
            onClick={() => setSelected(selected === member.id ? null : member.id)}
            className={`relative aspect-square rounded-lg overflow-hidden transition ${
              selected === member.id ? 'ring-2 ring-drama-red' : 'hover:opacity-80'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs font-semibold text-white truncate">{member.name}</p>
              <p className="text-[10px] text-gray-400">{member.show}</p>
            </div>
            {member.dramaScore > 7 && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-drama-red rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
      
      {selected && (
        <div className="border-t border-white/10 pt-4">
          {(() => {
            const member = cast.find(c => c.id === selected)
            if (!member) return null
            return (
              <div>
                <h3 className="font-semibold text-white mb-2">{member.name}</h3>
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
                <div className="text-xs text-gray-400">
                  <p className="mb-1">Relationships:</p>
                  {member.relationships.length === 0 ? (
                    <p className="text-gray-500">No tracked relationships</p>
                  ) : (
                    <ul className="space-y-1">
                      {member.relationships.map((rel, i) => {
                        const target = cast.find(c => c.id === rel.targetId)
                        if (!target) return null
                        return (
                          <li key={i} className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              rel.type === 'dating' ? 'bg-green-500' :
                              rel.type === 'ex' ? 'bg-red-500' :
                              rel.type === 'feud' ? 'bg-orange-500' :
                              'bg-blue-500'
                            }`} />
                            <span className="text-gray-300">{rel.type}</span>
                            <span className="text-white">{target.name}</span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
