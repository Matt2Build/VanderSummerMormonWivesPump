'use client'

import { useEffect, useState, useMemo } from 'react'
import { SHOWS, getAllXHandles, ShowId } from '@/lib/castDatabase'

interface Post {
  id: string
  platform: 'x' | 'youtube'
  author: string
  authorHandle: string
  authorImage?: string
  content: string
  timestamp: string
  engagement: number
  mediaUrl?: string
  url: string
  showId?: string
}

// Mock posts representing what we'd get from X API
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    platform: 'x',
    author: 'Lisa Vanderpump',
    authorHandle: 'LisaVanderpump',
    content: 'The reunion was… revealing 💎 Not everyone can handle the truth.',
    timestamp: '2h ago',
    engagement: 15420,
    url: 'https://x.com/LisaVanderpump/status/1',
    showId: 'vpr'
  },
  {
    id: '2',
    platform: 'x',
    author: 'Tom Sandoval',
    authorHandle: 'TomSandoval',
    content: 'Sometimes you have to choose yourself.',
    timestamp: '4h ago',
    engagement: 8932,
    url: 'https://x.com/TomSandoval/status/2',
    showId: 'vpr'
  },
  {
    id: '3',
    platform: 'x',
    author: 'Kyle Cooke',
    authorHandle: 'imkylecooke',
    content: 'Summer is coming… and so is the drama 🔥 @SummerHouse',
    timestamp: '5h ago',
    engagement: 5431,
    url: 'https://x.com/imkylecooke/status/3',
    showId: 'poll'
  },
  {
    id: '4',
    platform: 'x',
    author: 'Lindsay Hubbard',
    authorHandle: 'lindshubbs',
    content: 'Healing is not linear. Thank you all for the love ❤️',
    timestamp: '6h ago',
    engagement: 12200,
    url: 'https://x.com/lindshubbs/status/4',
    showId: 'poll'
  },
  {
    id: '5',
    platform: 'x',
    author: 'Kyle Richards',
    authorHandle: 'KyleRichards',
    content: 'Reunion ready 💅 See you tonight.',
    timestamp: '8h ago',
    engagement: 45600,
    url: 'https://x.com/KyleRichards/status/5',
    showId: 'rhobh'
  },
  {
    id: '6',
    platform: 'x',
    author: 'Dorit Kemsley',
    authorHandle: 'doritkemsley',
    content: 'The truth will set you free 🙏',
    timestamp: '10h ago',
    engagement: 8900,
    url: 'https://x.com/doritkemsley/status/6',
    showId: 'rhobh'
  },
  {
    id: '7',
    platform: 'youtube',
    author: 'Bravo TV',
    authorHandle: 'BravoTV',
    content: 'NEW: Scandoval, one year later. Where are they now?',
    timestamp: '12h ago',
    engagement: 125000,
    url: 'https://youtube.com/watch?v=123',
  },
  {
    id: '8',
    platform: 'x',
    author: 'Miranda McVeigh',
    authorHandle: 'miranda_mcveigh',
    content: 'Not everyone\'s story is what it seems 🤐 #MormonWives',
    timestamp: '3h ago',
    engagement: 15600,
    url: 'https://x.com/miranda_mcveigh/status/8',
    showId: 'mormonwives'
  },
]

export function DramaFeed() {
  const [posts] = useState<Post[]>(MOCK_POSTS)
  const [loading, setLoading] = useState(true)
  const [selectedShows, setSelectedShows] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'recent' | 'engagement'>('recent')

  useEffect(() => {
    // Simulate fetching from X API
    setTimeout(() => setLoading(false), 800)
  }, [])

  const filteredPosts = useMemo(() => {
    let filtered = posts
    
    // Filter by selected shows
    if (selectedShows.size > 0) {
      filtered = filtered.filter(post => 
        !post.showId || selectedShows.has(post.showId)
      )
    }
    
    // Sort
    return [...filtered].sort((a, b) => {
      if (sortBy === 'engagement') return b.engagement - a.engagement
      // Parse "2h ago", "4h ago" roughly
      return posts.indexOf(a) - posts.indexOf(b)
    })
  }, [posts, selectedShows, sortBy])

  const xHandles = getAllXHandles()

  const toggleShow = (showId: string) => {
    const newSet = new Set(selectedShows)
    if (newSet.has(showId)) {
      newSet.delete(showId)
    } else {
      newSet.add(showId)
    }
    setSelectedShows(newSet)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-drama-gray rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
            <div className="h-3 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-drama-gray rounded-lg p-3">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-gray-500 uppercase">Filter by show:</span>
          {SHOWS.map(show => (
            <button
              key={show.id}
              onClick={() => toggleShow(show.id)}
              className={`px-2 py-1 text-xs rounded-full transition ${
                selectedShows.has(show.id)
                  ? 'bg-drama-red text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              style={selectedShows.has(show.id) ? {} : { borderLeft: `3px solid ${show.color}` }}
            >
              {show.name}
            </button>
          ))}
          {selectedShows.size > 0 && (
            <button
              onClick={() => setSelectedShows(new Set())}
              className="text-xs text-gray-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 uppercase">Sort:</span>
          <button
            onClick={() => setSortBy('recent')}
            className={`text-xs ${sortBy === 'recent' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy('engagement')}
            className={`text-xs ${sortBy === 'engagement' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Most Engaging
          </button>
        </div>
      </div>

      {/* X Handles we're tracking */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span>Tracking {xHandles.length} cast accounts:</span>
        <span className="line-clamp-1">@{xHandles.slice(0, 5).join(', ')}...</span>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const show = SHOWS.find(s => s.id === post.showId)
          return (
            <article key={post.id} className="bg-drama-gray rounded-lg p-4 hover:bg-white/5 transition">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  post.platform === 'x' ? 'bg-black border border-white/20' : 'bg-red-600'
                }`}>
                  {post.platform === 'x' ? 'X' : 'YT'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-white">@{post.authorHandle}</span>
                    {show && (
                      <span 
                        className="text-[10px] px-1.5 py-0.5 rounded text-black font-medium"
                        style={{ backgroundColor: show.color }}
                      >
                        {show.network}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{post.timestamp}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{post.content}</p>
                  {post.mediaUrl && (
                    <div className="rounded-lg overflow-hidden mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.mediaUrl} alt="Post media" className="w-full max-h-64 object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>♥ {post.engagement.toLocaleString()}</span>
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-drama-red hover:underline">
                      View on {post.platform === 'x' ? 'X' : 'YouTube'}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
        
        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 py-8">No posts match your filters.</p>
        )}
      </div>
    </div>
  )
}
