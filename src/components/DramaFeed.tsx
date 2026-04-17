'use client'

import { useEffect, useState, useMemo } from 'react'
import { SHOWS, getAllXHandles, ShowId } from '@/lib/castDatabase'
import { Heart, MessageCircle, Share2, Verified, ExternalLink } from 'lucide-react'

interface Post {
  id: string
  platform: 'x' | 'instagram' | 'tiktok'
  author: string
  authorHandle: string
  authorImage?: string
  isVerified: boolean
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  mediaUrl?: string
  url: string
  showId?: string
  liked?: boolean
  saved?: boolean
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    platform: 'x',
    author: 'Lisa Vanderpump',
    authorHandle: 'LisaVanderpump',
    isVerified: true,
    content: 'The reunion was… quite revealing I must say 💎 Not everyone handles the truth with grace. #PumpRules',
    timestamp: '2h ago',
    likes: 15420,
    comments: 342,
    shares: 1205,
    url: 'https://x.com/LisaVanderpump/status/1',
    showId: 'vpr'
  },
  {
    id: '2',
    platform: 'instagram',
    author: 'Kyle Cooke',
    authorHandle: 'kylecooke',
    isVerified: true,
    content: 'Summer in the Hamptons hits different this year 🔥 @SummerHouse tonight at 9/8c!',
    timestamp: '4h ago',
    likes: 8932,
    comments: 456,
    shares: 234,
    url: 'https://instagram.com/p/123',
    showId: 'poll'
  },
  {
    id: '3',
    platform: 'x',
    author: 'Kyle Richards',
    authorHandle: 'KyleRichards',
    isVerified: true,
    content: 'Reunion ready 💅 Sometimes you just have to show up and speak your truth. #RHOBH',
    timestamp: '5h ago',
    likes: 28932,
    comments: 892,
    shares: 3402,
    url: 'https://x.com/KyleRichards/status/5',
    showId: 'rhobh'
  },
  {
    id: '4',
    platform: 'instagram',
    author: 'Shep Rose',
    authorHandle: 'ShepRose',
    isVerified: true,
    content: 'Charleston nights hit different 🥃 #SouthernCharm',
    timestamp: '6h ago',
    likes: 5431,
    comments: 234,
    shares: 89,
    url: 'https://instagram.com/p/456',
    showId: 'southerncharm'
  },
  {
    id: '5',
    platform: 'tiktok',
    author: 'Miranda McVeigh',
    authorHandle: 'miranda.mcveigh',
    isVerified: false,
    content: 'Not everything is what it seems on the outside 🤐 #MormonWives #SecretLives',
    timestamp: '3h ago',
    likes: 15600,
    comments: 1200,
    shares: 3400,
    url: 'https://tiktok.com/@miranda.mcveigh/video/123',
    showId: 'mormonwives'
  },
]

export function DramaFeed() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS)
  const [loading, setLoading] = useState(true)
  const [selectedShows, setSelectedShows] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'recent' | 'trending'>('recent')

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleSave = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, saved: !post.saved } : post
    ))
  }

  const filteredPosts = useMemo(() => {
    let filtered = posts
    if (selectedShows.size > 0) {
      filtered = filtered.filter(post => !post.showId || selectedShows.has(post.showId))
    }
    return [...filtered].sort((a, b) => {
      if (sortBy === 'trending') return (b.likes + b.comments * 2) - (a.likes + a.comments * 2)
      return posts.indexOf(a) - posts.indexOf(b)
    })
  }, [posts, selectedShows, sortBy])

  const toggleShow = (showId: string) => {
    const newSet = new Set(selectedShows)
    if (newSet.has(showId)) newSet.delete(showId)
    else newSet.add(showId)
    setSelectedShows(newSet)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="card-glamour p-5 animate-pulse">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="card-glamour p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter shows:</span>
          {SHOWS.map(show => (
            <button
              key={show.id}
              onClick={() => toggleShow(show.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                selectedShows.has(show.id)
                  ? 'text-white shadow-md'
                  : 'bg-white/50 text-gray-600 hover:bg-white'
              }`}
              style={selectedShows.has(show.id) ? { backgroundColor: show.color } : {}}
            >
              {show.name}
            </button>
          ))}
          {selectedShows.size > 0 && (
            <button
              onClick={() => setSelectedShows(new Set())}
              className="text-xs text-gray-400 hover:text-blush-500"
            >
              Clear
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-500 font-medium">Sort:</span>
          <button
            onClick={() => setSortBy('recent')}
            className={`px-3 py-1 rounded-full transition-colors ${
              sortBy === 'recent' ? 'bg-blush-100 text-blush-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSortBy('trending')}
            className={`px-3 py-1 rounded-full transition-colors ${
              sortBy === 'trending' ? 'bg-champagne-100 text-amber-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🔥 Trending
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const show = SHOWS.find(s => s.id === post.showId)
          const PlatformIcon = post.platform === 'x' ? (
            <span className="font-bold text-sm">𝕏</span>
          ) : post.platform === 'instagram' ? (
            <span className="text-pink-500 font-bold">IG</span>
          ) : (
            <span className="text-black font-bold">TT</span>
          )
          
          return (
            <article key={post.id} className="card-glamour p-5 hover:scale-[1.01] transition-transform">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-200 to-champagne-200 flex items-center justify-center text-lg font-bold text-blush-600">
                    {post.author.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs shadow-sm">
                    {PlatformIcon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-charcoal-900">{post.author}</span>
                    {post.isVerified && <Verified className="w-4 h-4 text-blue-500" />}
                    <span className="text-gray-400">@{post.authorHandle}</span>
                    {show && (
                      <span 
                        className="px-2 py-0.5 text-[10px] font-bold rounded-full text-white"
                        style={{ backgroundColor: show.color }}
                      >
                        {show.network}
                      </span>
                    )}
                    <span className="text-gray-400 text-sm">{post.timestamp}</span>
                  </div>
                  
                  {/* Content */}
                  <p className="text-charcoal-800 text-sm leading-relaxed mb-3">{post.content}</p>
                  
                  {/* Media placeholder */}
                  {post.mediaUrl && (
                    <div className="rounded-xl overflow-hidden mb-3 bg-gray-100 aspect-video flex items-center justify-center">
                      <span className="text-gray-400 text-sm">📸 Image/Video</span>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        post.liked ? 'text-blush-500' : 'text-gray-400 hover:text-blush-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                      {post.likes.toLocaleString()}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments.toLocaleString()}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-green-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                      {post.shares.toLocaleString()}
                    </button>
                    <button className="ml-auto flex items-center gap-1.5 text-sm text-gray-400 hover:text-charcoal-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
        
        {filteredPosts.length === 0 && (
          <div className="card-glamour p-8 text-center">
            <p className="text-gray-500">No tea spilling right now. Check back soon! ☕</p>
          </div>
        )}
      </div>
    </div>
  )
}
