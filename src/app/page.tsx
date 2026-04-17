import { DramaFeed } from '@/components/DramaFeed'
import { CastTracker } from '@/components/CastTracker'
import { PredictionPools } from '@/components/PredictionPools'
import { DramaScore } from '@/components/DramaScore'

export default function Home() {
  return (
    <main className="min-h-screen bg-drama-dark">
      <header className="border-b border-white/10 bg-drama-gray/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-drama-red to-pink-500 bg-clip-text text-transparent">
              VanderSummerMormonWivesPump
            </h1>
            <nav className="flex gap-6 text-sm">
              <a href="#feed" className="text-gray-300 hover:text-white transition">Feed</a>
              <a href="#cast" className="text-gray-300 hover:text-white transition">Cast Tracker</a>
              <a href="#pools" className="text-gray-300 hover:text-white transition">Predictions</a>
              <a href="#scores" className="text-gray-300 hover:text-white transition">Drama Scores</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            <section id="feed">
              <h2 className="text-xl font-semibold mb-4 text-white">Latest Drama Feed</h2>
              <DramaFeed />
            </section>
            
            <section id="pools">
              <h2 className="text-xl font-semibold mb-4 text-white">Prediction Pools</h2>
              <PredictionPools />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section id="cast">
              <h2 className="text-xl font-semibold mb-4 text-white">Cast Tracker</h2>
              <CastTracker />
            </section>
            
            <section id="scores">
              <h2 className="text-xl font-semibold mb-4 text-white">Drama Scores</h2>
              <DramaScore />
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
