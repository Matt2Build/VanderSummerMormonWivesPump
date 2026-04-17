'use client'

import { useState } from 'react'
import { DramaFeed } from '@/components/DramaFeed'
import { CastTracker } from '@/components/CastTracker'
import { PredictionPools } from '@/components/PredictionPools'
import { DramaScore } from '@/components/DramaScore'
import { ReceiptVault } from '@/components/ReceiptVault'
import { EpisodeTracker } from '@/components/EpisodeTracker'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'cast' | 'vault' | 'predictions'>('feed')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blush-50 via-white to-champagne-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-serif font-bold text-gradient-glamour">✨ VSMWP</span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { id: 'feed', label: 'Feed', icon: '💅' },
                { id: 'cast', label: 'Cast', icon: '👑' },
                { id: 'vault', label: 'Receipts', icon: '📸' },
                { id: 'predictions', label: 'Bet', icon: '💰' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`nav-link px-4 py-2 rounded-full transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blush-100 text-blush-600' 
                      : 'text-charcoal-600'
                  }`}
                >
                  <span className="mr-1">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <button className="btn-glamour text-sm hidden sm:block">
              Join the Drama
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-blush-100 z-50">
        <div className="flex justify-around py-3">
          {[
            { id: 'feed', label: 'Feed', icon: '💅' },
            { id: 'cast', label: 'Cast', icon: '👑' },
            { id: 'vault', label: 'Vault', icon: '📸' },
            { id: 'predictions', label: 'Bet', icon: '💰' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors ${
                activeTab === tab.id ? 'text-blush-500' : 'text-gray-400'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'feed' && (
              <section className="animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-charcoal-900">The Tea ☕</h2>
                    <p className="text-sm text-gray-500">Real-time drama from your favorites</p>
                  </div>
                </div>
                <DramaFeed />
              </section>
            )}

            {activeTab === 'cast' && (
              <section className="animate-fade-in">
                <div className="mb-4">
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">The Cast 👑</h2>
                  <p className="text-sm text-gray-500">Relationships, drama scores & socials</p>
                </div>
                <CastTracker />
              </section>
            )}

            {activeTab === 'vault' && (
              <section className="animate-fade-in">
                <div className="mb-4">
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">The Receipts 📸</h2>
                  <p className="text-sm text-gray-500">Screenshots don&apos;t lie, sweetie</p>
                </div>
                <ReceiptVault />
              </section>
            )}

            {activeTab === 'predictions' && (
              <section className="animate-fade-in">
                <div className="mb-4">
                  <h2 className="font-serif text-2xl font-bold text-charcoal-900">Place Your Bets 💰</h2>
                  <p className="text-sm text-gray-500">Predict the drama, climb the leaderboard</p>
                </div>
                <PredictionPools />
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Episode Tracker */}
            <section className="card-glamour p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">📺 What to Watch</h3>
              </div>
              <EpisodeTracker />
            </section>

            {/* Trending Drama */}
            <section className="card-glamour p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-charcoal-900">🔥 Trending Now</h3>
              </div>
              <DramaScore />
            </section>

            {/* Quick Stats */}
            <section className="card-glamour p-5 bg-gradient-to-br from-blush-100/50 to-champagne-100/50">
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-3">Your Stats ✨</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Predictions Won</span>
                  <span className="font-bold text-blush-500">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Streak</span>
                  <span className="font-bold text-champagne-500">🔥 3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rank</span>
                  <span className="font-bold text-rose-gold">#42</span>
                </div>
              </div>
              <button className="w-full mt-4 btn-champagne text-sm py-2">
                View Leaderboard
              </button>
            </section>

            {/* Newsletter */}
            <section className="card-glamour p-5 text-center">
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                Get the Daily Tea
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Wake up to last night&apos;s drama delivered to your inbox
              </p>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="input-glamour mb-3 text-sm"
              />
              <button className="w-full btn-glamour text-sm py-2">
                Subscribe
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
