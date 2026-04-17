'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, ExternalLink, Calendar, User, Link2 } from 'lucide-react'

interface Receipt {
  id: string
  title: string
  content: string
  date: string
  cast: string[]
  show: string
  type: 'screenshot' | 'video' | 'text' | 'legal'
  source: string
  sourceUrl?: string
  receipts: number
  likes: number
  saved?: boolean
}

const RECEIPTS: Receipt[] = [
  {
    id: '1',
    title: 'RHOBH Reunion Leak: Kyle vs Dorit',
    content: 'Exclusive backstage photos from last night\'s reunion taping show heated exchange.',
    date: '2026-04-16',
    cast: ['Kyle Richards', 'Dorit Kemsley'],
    show: 'RHOBH',
    type: 'screenshot',
    source: 'Production Leak',
    sourceUrl: 'https://reddit.com/r/bravorealhousewives',
    receipts: 12,
    likes: 42800
  },
  {
    id: '2',
    title: 'Summer House: Divorce Finalized',
    content: 'Documents confirm Kyle & Amanda split finalized this week.',
    date: '2026-04-15',
    cast: ['Kyle Cooke', 'Amanda Batula'],
    show: 'Summer House',
    type: 'legal',
    source: 'Court Records',
    sourceUrl: 'https://www.nycourts.gov',
    receipts: 8,
    likes: 32100
  },
  {
    id: '3',
    title: 'VPR: Season 12 Cast Shake-up',
    content: 'Production emails reveal who is returning and who got cut.',
    date: '2026-04-14',
    cast: ['Lisa Vanderpump', 'Tom Sandoval'],
    show: 'Vanderpump Rules',
    type: 'screenshot',
    source: 'Studio Leak',
    sourceUrl: 'https://reddit.com/r/vanderpumprules',
    receipts: 15,
    likes: 56700
  },
  {
    id: '4',
    title: 'Mormon Wives: Miranda New Deal',
    content: 'Contract shows Season 2 raise and producer credit negotiation.',
    date: '2026-04-13',
    cast: ['Miranda McVeigh'],
    show: 'Secret Lives of Mormon Wives',
    type: 'legal',
    source: 'Agency Document',
    sourceUrl: 'https://variety.com',
    receipts: 6,
    likes: 18900
  },
  {
    id: '5',
    title: 'Southern Charm Reunion Spoiler',
    content: 'Audience video shows Shep apology and Austen reaction.',
    date: '2026-04-12',
    cast: ['Shep Rose', 'Craig Conover', 'Austen Kroll'],
    show: 'Southern Charm',
    type: 'video',
    source: 'Audience Member',
    sourceUrl: 'https://tiktok.com',
    receipts: 23,
    likes: 45000
  },
]

export function ReceiptVault() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedShow, setSelectedShow] = useState<string>('all')
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent')

  const filtered = useMemo(() => {
    let filtered = RECEIPTS.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                           r.content.toLowerCase().includes(search.toLowerCase()) ||
                           r.cast.some(c => c.toLowerCase().includes(search.toLowerCase()))
      const matchesType = selectedType === 'all' || r.type === selectedType
      const matchesShow = selectedShow === 'all' || r.show === selectedShow
      return matchesSearch && matchesType && matchesShow
    })
    
    return [...filtered].sort((a, b) => {
      if (sortBy === 'popular') return b.likes - a.likes
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [search, selectedType, selectedShow, sortBy])

  const toggleSave = (id: string) => {
    const newSaved = new Set(saved)
    if (newSaved.has(id)) newSaved.delete(id)
    else newSaved.add(id)
    setSaved(newSaved)
  }

  const typeColors: Record<string, string> = {
    screenshot: 'bg-purple-100 text-purple-700',
    video: 'bg-red-100 text-red-700',
    text: 'bg-blue-100 text-blue-700',
    legal: 'bg-amber-100 text-amber-700',
  }

  const typeIcons: Record<string, string> = {
    screenshot: '📸',
    video: '🎥',
    text: '📝',
    legal: '⚖️',
  }

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="card-glamour p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search receipts, cast, shows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/70 border border-blush-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blush-300"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedShow}
            onChange={(e) => setSelectedShow(e.target.value)}
            className="px-3 py-1.5 bg-white/70 border border-blush-200 rounded-lg text-xs text-gray-700"
          >
            <option value="all">All Shows</option>
            <option value="Vanderpump Rules">Vanderpump Rules</option>
            <option value="Summer House">Summer House</option>
            <option value="RHOBH">RHOBH</option>
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 bg-white/70 border border-blush-200 rounded-lg text-xs text-gray-700"
          >
            <option value="all">All Types</option>
            <option value="screenshot">Screenshots</option>
            <option value="video">Video</option>
            <option value="text">Text/Posts</option>
            <option value="legal">Legal Docs</option>
          </select>
          
          <div className="flex-1"></div>
          
          <button
            onClick={() => setSortBy(sortBy === 'recent' ? 'popular' : 'recent')}
            className="px-3 py-1.5 bg-white/70 border border-blush-200 rounded-lg text-xs text-gray-700 hover:bg-white transition-colors"
          >
            {sortBy === 'recent' ? '⚡ Recent' : '🔥 Popular'}
          </button>
        </div>
      </div>

      {/* Receipts */}
      <div className="space-y-3">
        {filtered.map(receipt => (
          <div key={receipt.id} className="card-glamour p-4 hover:shadow-glamour transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${typeColors[receipt.type]}`}>
                  {typeIcons[receipt.type]} {receipt.type}
                </span>
                <span className="text-[10px] text-gray-400">{receipt.show}</span>
              </div>
              <div className="flex items-center gap-1">
                {receipt.sourceUrl && (
                  <a 
                    href={receipt.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full hover:bg-blush-100 text-gray-400 hover:text-blush-500 transition-colors"
                    title="View Source"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button 
                  onClick={() => toggleSave(receipt.id)}
                  className={`p-1.5 rounded-full transition-colors ${saved.has(receipt.id) ? 'bg-blush-100 text-blush-500' : 'hover:bg-gray-100 text-gray-400'}`}
                >
                  <span className="text-sm">{saved.has(receipt.id) ? '🔖' : '📑'}</span>
                </button>
              </div>
            </div>
            
            <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-1 flex items-center gap-2">
              {receipt.title}
              {receipt.sourceUrl && (
                <a 
                  href={receipt.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-normal text-blush-400 hover:text-blush-600 flex items-center gap-1"
                >
                  <Link2 className="w-3 h-3" />
                  View
                </a>
              )}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{receipt.content}</p>
            
            {/* Cast Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {receipt.cast.map(c => (
                <span key={c} className="flex items-center gap-1 px-2 py-0.5 bg-blush-50 text-blush-700 text-[10px] rounded-full">
                  <User className="w-3 h-3" />
                  {c}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-blush-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {receipt.date}
                </span>
                <span>📎 {receipt.receipts} files</span>
              </div>
              <span className="flex items-center gap-1">
                ❤️ {receipt.likes.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="card-glamour p-8 text-center">
            <p className="text-gray-500">No receipts found. They&apos;re probably in the vault 🔒</p>
          </div>
        )}
      </div>
    </div>
  )
}
