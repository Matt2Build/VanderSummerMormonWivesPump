'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface SpoilerToggleProps {
  enabled: boolean
  onToggle: () => void
}

export function SpoilerToggle({ enabled, onToggle }: SpoilerToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        enabled 
          ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
          : 'bg-white/70 text-gray-600 border border-gray-200'
      }`}
    >
      {enabled ? (
        <>
          <Eye className="w-4 h-4" />
          <span>Spoiler-Free ON</span>
        </>
      ) : (
        <>
          <EyeOff className="w-4 h-4" />
          <span>Spoilers Allowed</span>
        </>
      )}
    </button>
  )
}

// Spoiler mask component
interface SpoilerMaskProps {
  isEnabled: boolean
  children: React.ReactNode
  preview?: string
}

export function SpoilerMask({ isEnabled, children, preview = 'Spoiler content hidden' }: SpoilerMaskProps) {
  const [revealed, setRevealed] = useState(false)
  
  if (!isEnabled || revealed) {
    return <>{children}</>
  }
  
  return (
    <div 
      onClick={() => setRevealed(true)}
      className="bg-blur bg-blush-100/50 backdrop-blur-sm rounded-xl p-4 cursor-pointer hover:bg-blush-100/70 transition-colors border border-blush-200"
    >
      <div className="flex items-center gap-2 text-blush-700">
        <EyeOff className="w-4 h-4" />
        <span className="text-sm font-medium">{preview}</span>
      </div>
      <p className="text-xs text-blush-600 mt-1">Tap to reveal</p>
    </div>
  )
}
