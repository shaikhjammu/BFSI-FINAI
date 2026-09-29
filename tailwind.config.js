/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefaf6',
          100: '#d7f3ea',
          200: '#b1e5d7',
          300: '#7ecebe',
          400: '#46b2a0',
          500: '#239584',
          600: '#197669',
          700: '#165f56',
          800: '#144c45',
          900: '#133f3a',
          950: '#072522',
        },
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          cyan: '#06b6d4',
          indigo: '#6366f1'
        },
        dark: {
          bg: '#0a0f1d',
          card: '#111827',
          cardHover: '#1f293d',
          border: '#1e293b',
          subtle: '#334155'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(35, 149, 132, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(35, 149, 132, 0.8), 0 0 50px rgba(139, 92, 246, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-emerald': '0 0 20px -2px rgba(16, 185, 129, 0.5)',
        'neon-purple': '0 0 20px -2px rgba(139, 92, 246, 0.5)',
        'neon-blue': '0 0 20px -2px rgba(59, 130, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
