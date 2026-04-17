import { DramaFeed } from '@/components/DramaFeed'
import { CastTracker } from '@/components/CastTracker'
import { PredictionPools } from '@/components/PredictionPools'
import { DramaScore } from '@/components/DramaScore'
import { ReceiptVault } from '@/components/ReceiptVault'
import { EpisodeTracker } from '@/components/EpisodeTracker'

export default function Home() {
  return (
    <main className="min-h-screen bg-drama-dark">
      <header className="border-b border-white/10 bg-drama-gray/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-drama-red to-pink-500 bg-clip-text text-transparent">
              VS
            </h1>
            <nav className="hidden md:flex gap-6 text-sm">
              <a href="#feed" className="text-gray-300 hover:text-white transition">Feed</a>
              <a href="#cast" className="text-gray-300 hover:text-white transition">Cast</a>
              <a href="#vault" className="text-gray-300 hover:text-white transition">Vault</a>
              <a href="#predictions" className="text-gray-300 hover:text-white transition">Predictions</a>
              <a href="#episodes" className="text-gray-300 hover:text-white transition">Episodes</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            <section id="feed">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Drama Feed</h2>
                <span className="text-xs text-gray-500">Real-time from X & YouTube</span>
              </div>
              <DramaFeed />
            </section>
            
            <section id="vault">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Receipt Vault</h2>
                <span className="text-xs text-gray-500">Receipts don&apos;t lie</span>
              </div>
              <ReceiptVault />
            </section>
            
            <section id="predictions">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Prediction Pools</h2>
                <span className="text-xs text-gray-500">Bet on the drama</span>
              </div>
              <PredictionPools />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section id="cast">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Cast Tracker</h2>
                <span className="text-xs text-gray-500">{/* */}42 members</span>
              </div>
              <CastTracker />
            </section>
            
            <section id="episodes">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Episodes</h2>
                <span className="text-xs text-gray-500">Track what you watch</span>
              </div>
              <EpisodeTracker />
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
