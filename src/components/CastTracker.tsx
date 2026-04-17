'use client'

import { useEffect, useState, useMemo } from 'react'
import { CAST_DB, SHOWS, CastMember } from '@/lib/castDatabase'
import { VERIFIED_HANDLES } from '@/lib/verifiedHandles'
import { Heart, Link2, TrendingUp, Users, X, Filter, Search } from 'lucide-react'

export function CastTracker() {
  const [cast, setCast] = useState<CastMember[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedShow, setSelectedShow] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'drama' | 'name' | 'followers'>('drama')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    setCast(CAST_DB)
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavs = new Set(favorites)
    if (newFavs.has(id)) newFavs.delete(id)
    else newFavs.add(id)
    setFavorites(newFavs)
  }

  const filteredCast = useMemo(() => {
    let filtered = cast
    
    // Filter by show
    if (selectedShow !== 'all') {
      filtered = filtered.filter(c => c.showId === selectedShow)
    }
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.show.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    // Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === 'drama') return b.dramaScore - a.dramaScore
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [cast, selectedShow, searchQuery, sortBy])

  if (cast.length === 0) {
    return (
      <div className="card-glamour p-8 text-center">
        <p className="text-gray-500">Loading the drama...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="card-glamour p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cast members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/50 border border-blush-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedShow('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              selectedShow === 'all' 
                ? 'bg-blush-400 text-white shadow-glamour' 
                : 'bg-white/50 text-gray-600 hover:bg-white'
            }`}
          >
            All Shows
          </button>
          {SHOWS.map(show => (
            <button
              key={show.id}
              onClick={() => setSelectedShow(show.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                selectedShow === show.id 
                  ? 'text-white shadow-md' 
                  : 'bg-white/50 text-gray-600 hover:bg-white'
              }`}
              style={selectedShow === show.id ? { backgroundColor: show.color } : {}}
            >
              {show.name}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3 h-3 text-gray-400" />
          <span className="text-gray-500">Sort:</span>
          {(['drama', 'name'] as const).map(opt => (
            <button
              key={opt}
              onClick={() => setSortBy(opt)}
              className={`capitalize px-2 py-1 rounded transition-colors ${
                sortBy === opt ? 'bg-blush-100 text-blush-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {opt === 'drama' ? '🔥 Drama Score' : 'A-Z'}
            </button>
          ))}
        </div>
      </div>

      {/* Cast Grid */}
      <div className="card-glamour p-5">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 mb-4">
          {filteredCast.map(member => {
            const isVerified = VERIFIED_HANDLES[member.id]
            const isFav = favorites.has(member.id)
            return (
              <button
                key={member.id}
                onClick={() => setSelected(selected === member.id ? null : member.id)}
                className={`relative group ${selected === member.id ? 'ring-2 ring-blush-400 ring-offset-2' : ''}`}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blush-100 to-champagne-100 shadow-soft group-hover:shadow-glamour transition-all group-hover:scale-105">
                  {/* Placeholder Avatar with Initials */}
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-charcoal-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    {member.dramaScore >= 8 && (
                      <span className="absolute top-1 right-1 text-xs">🔥</span>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-[10px] font-medium text-charcoal-700 text-center truncate">
                  {member.name.split(' ')[0]}
                </p>
                {isVerified && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-[8px] text-white">✓</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        
        {/* Selected Detail View */}
        {selected && (
          <div className="border-t border-blush-100 pt-4 animate-fade-in">
            {(() => {
              const member = cast.find(c => c.id === selected)
              if (!member) return null
              const xHandle = VERIFIED_HANDLES[member.id]
              const isFav = favorites.has(member.id)
              
              return (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {/* Large Avatar */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blush-200 to-champagne-200 flex items-center justify-center text-2xl font-bold text-charcoal-700 shadow-glamour">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-xl font-bold text-charcoal-900">{member.name}</h3>
                        {xHandle && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold">✓</span>
                          </div>
                        )}
                        <button 
                          onClick={() => toggleFavorite(member.id)}
                          className={`p-1 rounded-full transition-colors ${isFav ? 'text-blush-500' : 'text-gray-300 hover:text-blush-300'}`}
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">{member.show}</p>
                      
                      {/* Social Links */}
                      <div className="flex gap-2 mt-2">
                        {xHandle && (
                          <a 
                            href={`https://x.com/${xHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full hover:bg-gray-800 transition-colors"
                          >
                            <span className="font-bold">𝕏</span> @{xHandle}
                          </a>
                        )}
                        {member.instagram && (
                          <a 
                            href={`https://instagram.com/${member.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full hover:opacity-90 transition-opacity"
                          >
                            IG @{member.instagram}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Drama Score */}
                  <div className="bg-gradient-to-r from-blush-50 to-champagne-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-charcoal-700 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-blush-500" />
                        Drama Score
                      </span>
                      <span className="text-2xl font-bold text-blush-500">{member.dramaScore}/10</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blush-300 via-blush-400 to-rose-gold rounded-full transition-all duration-500"
                        style={{ width: `${member.dramaScore * 10}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Relationships */}
                  {member.relationships.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-charcoal-700 mb-2 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Relationships
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.relationships.map((rel, i) => {
                          const target = cast.find(c => c.id === rel.targetId)
                          if (!target) return null
                          return (
                            <button
                              key={i}
                              onClick={() => setSelected(target.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-xs"
                            >
                              <span className={`w-2 h-2 rounded-full ${
                                rel.type === 'dating' || rel.type === 'engaged' || rel.type === 'married' ? 'bg-pink-400' :
                                rel.type === 'ex' ? 'bg-red-400' :
                                rel.type === 'feud' ? 'bg-orange-400' :
                                rel.type === 'frenemies' ? 'bg-yellow-400' :
                                'bg-green-400'
                              }`} />
                              <span className="capitalize text-gray-500">{rel.type}</span>
                              <span className="font-medium text-charcoal-700">{target.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )}
        
        {!selected && (
          <div className="text-center py-4 text-gray-500">
            <p className="text-sm">{filteredCast.length} cast members</p>
            <p className="text-xs">Tap a photo to see details</p>
          </div>
        )}
      </div>
    </div>
  )
}
