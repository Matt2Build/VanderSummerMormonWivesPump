'use client'

import { useEffect, useState, useMemo } from 'react'
import { CAST_DB, SHOWS, CastMember } from '@/lib/castDatabase'
import { VERIFIED_HANDLES } from '@/lib/verifiedHandles'
import { Heart, ExternalLink, TrendingUp, Search, Filter, X, Shield } from 'lucide-react'

const getAvatarColor = (name: string) => {
  const colors = [
    'from-rose-300 to-pink-400',
    'from-purple-300 to-indigo-400',
    'from-blue-300 to-cyan-400',
    'from-teal-300 to-emerald-400',
    'from-amber-300 to-orange-400',
  ]
  return colors[name.charCodeAt(0) % colors.length]
}

export function CastTracker() {
  const [cast, setCast] = useState<CastMember[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedShow, setSelectedShow] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'drama' | 'name'>('drama')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    setCast(CAST_DB)
  }, [])

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const newFavs = new Set(favorites)
    if (newFavs.has(id)) newFavs.delete(id)
    else newFavs.add(id)
    setFavorites(newFavs)
  }

  const filteredCast = useMemo(() => {
    let filtered = selectedShow === 'all' ? cast : cast.filter(c => c.showId === selectedShow)
    
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.show.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'drama') return b.dramaScore - a.dramaScore
      return a.name.localeCompare(b.name)
    })
  }, [cast, selectedShow, searchQuery, sortBy])

  if (cast.length === 0) return <div className="card-glamour p-8 text-center"><p className="text-gray-500">Loading...</p></div>

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="card-glamour p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Find cast member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-blush-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedShow('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
              selectedShow === 'all' ? 'bg-blush-400 text-white' : 'bg-white/50 text-gray-600'
            }`}
          >
            All ({cast.length})
          </button>
          {SHOWS.map(show => (
            <button
              key={show.id}
              onClick={() => setSelectedShow(show.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                selectedShow === show.id ? 'text-white' : 'bg-white/50 text-gray-600'
              }`}
              style={selectedShow === show.id ? { backgroundColor: show.color } : {}}
            >
              {show.name.split(' ')[0]} ({cast.filter(c => c.showId === show.id).length})
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3 h-3 text-gray-400" />
          <span className="text-gray-500">Sort:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-transparent border-none text-charcoal-700 font-medium text-xs focus:outline-none cursor-pointer"
          >
            <option value="drama">🔥 Drama Score</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {filteredCast.map(member => {
          const xHandle = VERIFIED_HANDLES[member.id]
          const isFav = favorites.has(member.id)
          const show = SHOWS.find(s => s.id === member.showId)
          
          return (
            <button
              key={member.id}
              onClick={() => setSelected(selected === member.id ? null : member.id)}
              className="relative group text-left"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br shadow-soft group-hover:shadow-glamour transition-all">
                <div className={`w-full h-full bg-gradient-to-br ${getAvatarColor(member.name)} flex flex-col items-center justify-center relative`}>
                  <span className="text-3xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  
                  {xHandle && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-blue-500" />
                    </div>
                  )}
                  
                  {member.dramaScore >= 8 && (
                    <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      🔥 {member.dramaScore}
                    </div>
                  )}
                  
                  <button
                    onClick={(e) => toggleFavorite(member.id, e)}
                    className={`absolute bottom-2 right-2 p-1.5 rounded-full transition-all ${isFav ? 'bg-red-500 text-white' : 'bg-white/30 text-white'}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white font-semibold text-[10px] truncate">{member.name}</p>
                    <p className="text-white/70 text-[9px] truncate">{show?.name}</p>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      
      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-y-auto">
            {(() => {
              const member = cast.find(c => c.id === selected)
              if (!member) return null
              const xHandle = VERIFIED_HANDLES[member.id]
              const show = SHOWS.find(s => s.id === member.showId)
              const isFav = favorites.has(member.id)
              
              return (
                <div>
                  <div className={`h-28 bg-gradient-to-br ${getAvatarColor(member.name)} relative`}>
                    <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-2 bg-white/20 rounded-full text-white">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute -bottom-8 left-4 w-16 h-16 rounded-xl bg-white p-1 shadow-lg">
                      <div className={`w-full h-full rounded-lg bg-gradient-to-br ${getAvatarColor(member.name)} flex items-center justify-center`}>
                        <span className="text-xl font-bold text-white">{member.name.charAt(0)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-10 px-4 pb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-charcoal-900">{member.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded text-white" style={{ backgroundColor: show?.color }}>{show?.name}</span>
                      </div>
                      <button onClick={(e) => toggleFavorite(member.id, e)} className={`p-2 rounded-full ${isFav ? 'bg-red-100 text-red-500' : 'bg-gray-100'}`}>
                        <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {xHandle && (
                        <a href={`https://x.com/${xHandle}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs rounded-lg">
                          𝕏 @{xHandle} <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    
                    <div className="bg-blush-50 rounded-xl p-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm flex items-center gap-1"><TrendingUp className="w-4 h-4 text-blush-500" /> Drama Score</span>
                        <span className="text-xl font-bold text-blush-500">{member.dramaScore}/10</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-blush-400 rounded-full" style={{ width: `${member.dramaScore * 10}%` }} />
                      </div>
                    </div>
                    
                    {member.relationships.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Relationships</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.relationships.map((rel, i) => {
                            const target = cast.find(c => c.id === rel.targetId)
                            if (!target) return null
                            return (
                              <button key={i} onClick={() => setSelected(target.id)} className="px-3 py-1.5 bg-white rounded-full shadow-sm text-xs">
                                <span className="capitalize text-gray-500">{rel.type}</span> <span className="font-medium">{target.name}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
