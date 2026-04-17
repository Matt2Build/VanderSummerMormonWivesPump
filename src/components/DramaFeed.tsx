'use client'

import { useEffect, useState } from 'react'
import { FEED_POSTS } from '@/lib/data'

interface Post {
  id: string
  platform: 'x' | 'youtube'
  author: string
  content: string
  timestamp: string
  engagement: number
  mediaUrl?: string
  url: string
}

export function DramaFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use static data (in production, fetch from X API)
    setPosts(FEED_POSTS)
    setLoading(false)
  }, [])

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

  if (posts.length === 0) {
    return (
      <div className="bg-drama-gray rounded-lg p-6 text-center">
        <p className="text-gray-400">No drama detected yet. API integration needed.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <article key={post.id} className="bg-drama-gray rounded-lg p-4 hover:bg-white/5 transition">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              post.platform === 'x' ? 'bg-black border border-white/20' : 'bg-red-600'
            }`}>
              {post.platform === 'x' ? 'X' : 'YT'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">@{post.author}</span>
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
      ))}
    </div>
  )
}
