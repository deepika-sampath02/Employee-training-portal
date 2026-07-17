/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F1E6',
        paperDark: '#EAE3D2',
        ink: '#16241F',
        forest: '#1F3D2B',
        forestDeep: '#132A1D',
        brass: '#B8912F',
        brassLight: '#D9B658',
        brick: '#8C3A2E',
        slate: '#52605A',
      },
      fontFamily: {
        display: ['"Newsreader"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 12px 30px -12px rgba(22, 36, 31, 0.25)',
        seal: '0 4px 14px rgba(184, 145, 47, 0.45)',
      },
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(2.4) rotate(-18deg)', opacity: '0' },
          '55%': { transform: 'scale(0.92) rotate(-8deg)', opacity: '1' },
          '75%': { transform: 'scale(1.05) rotate(-10deg)' },
          '100%': { transform: 'scale(1) rotate(-9deg)', opacity: '1' },
        },
        fanIn: {
          '0%': { transform: 'translateY(24px) rotate(0deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotate(var(--rot))', opacity: '1' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        stamp: 'stamp 0.9s cubic-bezier(.2,.8,.2,1) 0.4s both',
        fanIn: 'fanIn 0.7s ease-out both',
        drift: 'drift 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
