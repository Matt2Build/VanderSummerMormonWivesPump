import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

const SHOWS = [
  'Vanderpump Rules',
  'Real Housewives',
  'Summer House',
  'Southern Charm',
  'Mormon Wives',
  'Below Deck'
]

const CAST_ACCOUNTS = [
  'LisaVanderpump',
  'Andy',
  'BravoTV',
  'Peacock',
  // Add more cast members as discovered
]

export async function GET() {
  try {
    // Search X for recent Bravo-related posts
    const searchQueries = [
      'Vanderpump Rules',
      'Real Housewives',
      'Summer House Bravo',
      'Southern Charm',
      'Mormon Wives TLC',
    ]
    
    let allPosts: any[] = []
    
    for (const query of searchQueries.slice(0, 2)) { // Limit to avoid rate limits
      try {
        const result = execSync(
          `xurl search "${query}" -n 5 --json`,
          { encoding: 'utf-8', timeout: 10000 }
        )
        const data = JSON.parse(result)
        
        if (data.data) {
          const posts = data.data.map((post: any) => ({
            id: post.id,
            platform: 'x' as const,
            author: post.author_id || 'unknown',
            content: post.text,
            timestamp: new Date().toISOString(),
            engagement: post.public_metrics?.like_count || 0,
            url: `https://x.com/i/web/status/${post.id}`
          }))
          allPosts = [...allPosts, ...posts]
        }
      } catch (e) {
        console.error(`Search failed for "${query}":`, e)
      }
    }

    // Sort by engagement
    allPosts.sort((a, b) => b.engagement - a.engagement)
    
    return NextResponse.json({ posts: allPosts.slice(0, 10) })
  } catch (error) {
    console.error('Feed API error:', error)
    return NextResponse.json({ posts: [] })
  }
}
