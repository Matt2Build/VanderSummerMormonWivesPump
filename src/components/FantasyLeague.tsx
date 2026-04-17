'use client'

import { useState } from 'react'
import { Crown, Zap, Flame, DollarSign, TrendingUp, Users } from 'lucide-react'
import { CAST_DB } from '@/lib/castDatabase'

interface FantasyPlayer {
  id: string
  name: string
  show: string
  price: number
  points: number
  stats: {
    confessionals: number
    arguments: number
    tears: number
    taglines: number
  }
  trending: 'up' | 'down' | 'neutral'
}

const FANTASY_ROSTER: FantasyPlayer[] = [
  { id: 'lisa-vanderpump', name: 'Lisa V.', show: 'VPR', price: 50, points: 245, stats: { confessionals: 12, arguments: 3, tears: 0, taglines: 4 }, trending: 'up' },
  { id: 'kyle-richards', name: 'Kyle R.', show: 'RHOBH', price: 45, points: 198, stats: { confessionals: 10, arguments: 5, tears: 2, taglines: 3 }, trending: 'up' },
  { id: 'tom-sandoval', name: 'Tom S.', show: 'VPR', price: 40, points: 320, stats: { confessionals: 15, arguments: 8, tears: 2, taglines: 2 }, trending: 'up' },
  { id: 'ariana-madix', name: 'Ariana', show: 'VPR', price: 38, points: 289, stats: { confessionals: 11, arguments: 6, tears: 1, taglines: 3 }, trending: 'down' },
  { id: 'kyle-cooke', name: 'Kyle C.', show: 'Summer House', price: 35, points: 176, stats: { confessionals: 8, arguments: 4, tears: 0, taglines: 2 }, trending: 'neutral' },
  { id: 'lindsay-hubbard', name: 'Lindsay', show: 'Summer House', price: 42, points: 203, stats: { confessionals: 9, arguments: 7, tears: 3, taglines: 4 }, trending: 'up' },
  { id: 'shep-rose', name: 'Shep', show: 'Southern Charm', price: 30, points: 145, stats: { confessionals: 6, arguments: 2, tears: 0, taglines: 1 }, trending: 'down' },
  { id: 'madison-lecroy', name: 'Madison', show: 'Southern Charm', price: 35, points: 167, stats: { confessionals: 7, arguments: 5, tears: 1, taglines: 3 }, trending: 'up' },
]

interface UserTeam {
  players: string[]
  budget: number
  totalPoints: number
}

export function FantasyLeague() {
  const [team, setTeam] = useState<UserTeam>({ players: [], budget: 150, totalPoints: 0 })
  const [view, setView] = useState<'market' | 'myteam'>('market')

  const addToTeam = (player: FantasyPlayer) => {
    if (team.players.includes(player.id) || team.budget < player.price) return
    setTeam(prev => ({
      players: [...prev.players, player.id],
      budget: prev.budget - player.price,
      totalPoints: prev.totalPoints + player.points
    }))
  }

  const removeFromTeam = (playerId: string) => {
    const player = FANTASY_ROSTER.find(p => p.id === playerId)
    if (!player) return
    setTeam(prev => ({
      players: prev.players.filter(id => id !== playerId),
      budget: prev.budget + player.price,
      totalPoints: prev.totalPoints - player.points
    }))
  }

  const myTeamPlayers = FANTASY_ROSTER.filter(p => team.players.includes(p.id))

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-glamour p-3 text-center">
          <DollarSign className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Budget</p>
          <p className="font-bold text-lg text-charcoal-900">${team.budget}</p>
        </div>
        <div className="card-glamour p-3 text-center">
          <Crown className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Points</p>
          <p className="font-bold text-lg text-charcoal-900">{team.totalPoints}</p>
        </div>
        <div className="card-glamour p-3 text-center">
          <Users className="w-5 h-5 text-blush-500 mx-auto mb-1" />
          <p className="text-xs text-gray-500">Team</p>
          <p className="font-bold text-lg text-charcoal-900">{team.players.length}/5</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/50 rounded-xl p-1">
        <button
          onClick={() => setView('market')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            view === 'market' ? 'bg-white shadow-sm text-charcoal-900' : 'text-gray-500'
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setView('myteam')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            view === 'myteam' ? 'bg-white shadow-sm text-charcoal-900' : 'text-gray-500'
          }`}
        >
          My Team ({team.players.length})
        </button>
      </div>

      {/* Market View */}
      {view === 'market' && (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {FANTASY_ROSTER.map(player => {
            const isOnTeam = team.players.includes(player.id)
            const canAfford = team.budget >= player.price
            
            return (
              <div key={player.id} className={`card-glamour p-3 ${isOnTeam ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush-200 to-champagne-200 flex items-center justify-center text-sm font-bold text-charcoal-700">
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal-900 text-sm">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.show}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-charcoal-900">{player.points} pts</p>
                    <p className="text-xs text-gray-500">${player.price}</p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex gap-3 mt-2 pt-2 border-t border-blush-100">
                  <span className="text-[10px] flex items-center gap-1 text-gray-500">
                    <Zap className="w-3 h-3" /> {player.stats.confessionals}
                  </span>
                  <span className="text-[10px] flex items-center gap-1 text-gray-500">
                    <Flame className="w-3 h-3" /> {player.stats.arguments}
                  </span>
                  <span className="text-[10px] flex items-center gap-1 text-gray-500">
                    💧 {player.stats.tears}
                  </span>
                </div>
                
                {!isOnTeam && (
                  <button
                    onClick={() => addToTeam(player)}
                    disabled={!canAfford}
                    className={`w-full mt-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      canAfford 
                        ? 'bg-blush-100 text-blush-600 hover:bg-blush-200' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Draft' : 'Too expensive'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* My Team View */}
      {view === 'myteam' && (
        <div className="space-y-2">
          {myTeamPlayers.length === 0 ? (
            <div className="card-glamour p-8 text-center">
              <p className="text-gray-500 text-sm">Build your dream drama team! 🎭</p>
            </div>
          ) : (
            myTeamPlayers.map(player => (
              <div key={player.id} className="card-glamour p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blush-200 to-champagne-200 flex items-center justify-center text-sm font-bold text-charcoal-700">
                      {player.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal-900 text-sm">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.points} points</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeFromTeam(player.id)}
                    className="px-3 py-1.5 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
          
          {myTeamPlayers.length > 0 && (
            <div className="bg-gradient-to-r from-blush-100 to-champagne-100 rounded-xl p-4">
              <p className="text-xs text-gray-600 mb-1">Weekly Projection</p>
              <p className="font-serif text-2xl font-bold text-charcoal-900">
                +{Math.round(myTeamPlayers.reduce((sum, p) => sum + p.points * 0.15, 0))} pts
              </p>
              <p className="text-xs text-gray-500">Based on current drama levels</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
