'use client'

import { useState, useMemo } from 'react'

interface Receipt {
  id: string
  title: string
  content: string
  date: string
  cast: string[]
  show: string
  type: 'tweet' | 'text' | 'video' | 'photo'
  source: string
  evidence: string[]
}

const RECEIPTS: Receipt[] = [
  {
    id: '1',
    title: 'Scandoval Text Leaks',
    content: 'Screenshots of Tom Sandoval\'s texts to Raquel Leviss leaked showing affair timeline.',
    date: '2023-03-01',
    cast: ['Tom Sandoval', 'Raquel Leviss', 'Ariana Madix'],
    show: 'Vanderpump Rules',
    type: 'text',
    source: 'Reddit leak',
    evidence: ['Screenshot 1', 'Timeline analysis']
  },
  {
    id: '2',
    title: 'Kyle & Amanda Divorce Announcement',
    content: 'Summer House couple announces separation after 2 years of marriage.',
    date: '2024-09-15',
    cast: ['Kyle Cooke', 'Amanda Batula'],
    show: 'Summer House',
    type: 'tweet',
    source: 'Instagram Story',
    evidence: ['Original post', 'Comment thread']
  },
  {
    id: '3',
    title: 'Erika Jayne Legal Documents',
    content: 'Court filings reveal details of settlement and bankruptcy proceedings.',
    date: '2023-12-20',
    cast: ['Erika Jayne'],
    show: 'Real Housewives of Beverly Hills',
    type: 'photo',
    source: 'Court records',
    evidence: ['Document scan', 'News article']
  },
]

export function ReceiptVault() {
  const [search, setSearch] = useState('')
  const [selectedCast, setSelectedCast] = useState<string>('all')
  const [selectedShow, setSelectedShow] = useState<string>('all')

  const filtered = useMemo(() => {
    return RECEIPTS.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                           r.content.toLowerCase().includes(search.toLowerCase())
      const matchesCast = selectedCast === 'all' || r.cast.includes(selectedCast)
      const matchesShow = selectedShow === 'all' || r.show === selectedShow
      return matchesSearch && matchesCast && matchesShow
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [search, selectedCast, selectedShow])

  return (
    <div className="space-y-4">
      <div className="bg-drama-gray rounded-lg p-4 space-y-3">
        <input
          type="text"
          placeholder="Search receipts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-drama-red"
        />
        <div className="flex gap-2">
          <select 
            value={selectedShow} 
            onChange={(e) => setSelectedShow(e.target.value)}
            className="bg-black/30 border border-white/10 rounded px-2 py-1 text-xs text-white"
          >
            <option value="all">All Shows</option>
            <option value="Vanderpump Rules">Vanderpump Rules</option>
            <option value="Summer House">Summer House</option>
            <option value="Real Housewives of Beverly Hills">RHOBH</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(receipt => (
          <div key={receipt.id} className="bg-drama-gray rounded-lg p-4 hover:bg-white/5 transition">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white text-sm">{receipt.title}</h3>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                receipt.type === 'tweet' ? 'bg-blue-500/20 text-blue-400' :
                receipt.type === 'text' ? 'bg-green-500/20 text-green-400' :
                receipt.type === 'video' ? 'bg-red-500/20 text-red-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {receipt.type}
              </span>
            </div>
            <p className="text-gray-400 text-xs mb-2">{receipt.content}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {receipt.cast.map(c => (
                <span key={c} className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span>{receipt.date}</span>
              <span>Source: {receipt.source}</span>
            </div>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-4 text-sm">No receipts found.</p>
        )}
      </div>
    </div>
  )
}
