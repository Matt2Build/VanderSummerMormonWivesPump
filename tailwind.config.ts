import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Glamorous feminine palette for Bravo audience
        'blush': {
          50: '#FFF0F3',
          100: '#FFE4E8',
          200: '#FECDD4',
          300: '#FDA4B2',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
        },
        'champagne': {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        'rose-gold': {
          DEFAULT: '#B76E79',
          light: '#D4A5AC',
          dark: '#8B4F5A',
        },
        'charcoal': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        // Show brand colors
        'vpr-pink': '#E91E63',
        'summer-orange': '#FF6B35',
        'rhobh-blue': '#00BCD4',
        'rhoslc-teal': '#00897B',
        'charm-purple': '#7C4DFF',
        'mormon-gold': '#FFD700',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'script': ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glamour': 'linear-gradient(135deg, #FFF0F3 0%, #FFE4E8 50%, #FDE68A 100%)',
        'midnight': 'linear-gradient(180deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
        'rose-shimmer': 'linear-gradient(90deg, #B76E79 0%, #D4A5AC 50%, #B76E79 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glamour': '0 4px 30px rgba(251, 113, 133, 0.3)',
        'glow': '0 0 20px rgba(255, 215, 0, 0.4)',
        'soft': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
