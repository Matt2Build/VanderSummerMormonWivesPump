'use client'

import { useState, useEffect } from 'react'
import { Trophy, RotateCcw, Sparkles } from 'lucide-react'

interface BingoSquare {
  id: string
  phrase: string
  category: 'classic' | 'shady' | 'emotional' | 'petty'
  marked: boolean
}

const BINGO_PHRASES: Omit<BingoSquare, 'marked'>[] = [
  { id: '1', phrase: 'I said what I said', category: 'classic' },
  { id: '2', phrase: 'The truth comes out', category: 'classic' },
  { id: '3', phrase: 'I\'m done', category: 'emotional' },
  { id: '4', phrase: 'Throwing shade', category: 'shady' },
  { id: '5', phrase: 'Talk to the hand', category: 'petty' },
  { id: '6', phrase: 'You\'re cancelled', category: 'petty' },
  { id: '7', phrase: 'Namaste', category: 'classic' },
  { id: '8', phrase: 'The vibe is off', category: 'shady' },
  { id: '9', phrase: 'I\'m not here to make friends', category: 'classic' },
  { id: '10', phrase: 'Plotting my return', category: 'shady' },
  { id: '11', phrase: 'Lowest moment of my life', category: 'emotional' },
  { id: '12', phrase: 'Receipts do not lie', category: 'classic' },
  { id: '13', phrase: 'Gaslighting', category: 'shady' },
  { id: '14', phrase: 'Fake as hell', category: 'petty' },
  { id: '15', phrase: 'Triggered', category: 'emotional' },
  { id: '16', phrase: 'Not today Satan', category: 'classic' },
]

export function ConfessionalBingo() {
  const [squares, setSquares] = useState<BingoSquare[]>([])
  const [score, setScore] = useState(0)
  const [showWin, setShowWin] = useState(false)

  useEffect(() => {
    // Randomly select 16 phrases for the bingo card
    const shuffled = [...BINGO_PHRASES].sort(() => Math.random() - 0.5).slice(0, 16)
    setSquares(shuffled.map(p => ({ ...p, marked: false })))
  }, [])

  const toggleSquare = (id: string) => {
    setSquares(prev => prev.map(sq => 
      sq.id === id ? { ...sq, marked: !sq.marked } : sq
    ))
  }

  const resetCard = () => {
    const shuffled = [...BINGO_PHRASES].sort(() => Math.random() - 0.5).slice(0, 16)
    setSquares(shuffled.map(p => ({ ...p, marked: false })))
    setShowWin(false)
  }

  // Calculate score based on marked squares
  useEffect(() => {
    const markedCount = squares.filter(s => s.marked).length
    setScore(markedCount)
    if (markedCount === 16 && !showWin) {
      setShowWin(true)
    }
  }, [squares, showWin])

  const categoryColors: Record<string, string> = {
    classic: 'bg-blush-100 text-blush-700 border-blush-200',
    shady: 'bg-purple-100 text-purple-700 border-purple-200',
    emotional: 'bg-blue-100 text-blue-700 border-blue-200',
    petty: 'bg-amber-100 text-amber-700 border-amber-200',
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blush-500" />
          <span className="font-bold text-charcoal-900">Score: {score}/16</span>
        </div>
        <button 
          onClick={resetCard}
          className="flex items-center gap-1 px-3 py-1.5 bg-white/70 rounded-lg text-xs text-gray-600 hover:bg-white transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          New Card
        </button>
      </div>

      {/* Bingo Grid */}
      <div className="grid grid-cols-4 gap-2">
        {squares.map((square) => (
          <button
            key={square.id}
            onClick={() => toggleSquare(square.id)}
            className={`aspect-square rounded-xl p-2 text-[9px] font-medium leading-tight transition-all ${
              square.marked 
                ? 'bg-gradient-to-br from-blush-400 to-blush-500 text-white scale-95 shadow-glamour' 
                : `${categoryColors[square.category]} hover:shadow-md border`
            }`}
          >
            {square.marked && <span className="absolute top-1 right-1 text-xs">✓</span>}
            {square.phrase}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center text-[10px]">
        {Object.entries(categoryColors).map(([cat, colors]) => (
          <span key={cat} className={`px-2 py-0.5 rounded-full capitalize ${colors}`}>
            {cat}
          </span>
        ))}
      </div>

      {/* Win Modal */}
      {showWin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center animate-bounce">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">BLACKOUT!</h3>
            <p className="text-gray-600 mb-4">You caught ALL the drama! 🎉</p>
            <button 
              onClick={resetCard}
              className="btn-glamour w-full"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
