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
        cyber: {
          dark: '#030612',
          deep: '#070C21',
          card: 'rgba(15, 23, 42, 0.45)',
          border: 'rgba(255, 255, 255, 0.12)',
          cyan: '#00F0FF',
          purple: '#A855F7',
          magenta: '#EC4899',
          emerald: '#10B981',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '64px',
      },
      boxShadow: {
        'neon-cyan': '0 0 35px -5px rgba(0,240,255,0.4)',
        'neon-purple': '0 0 35px -5px rgba(168, 85, 247, 0.4)',
        'glass-glow': '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'mesh-glow': 'meshGlow 12s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        meshGlow: {
          '0%': { opacity: '0.4', transform: 'scale(1) translate(0px, 0px)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1) translate(20px, -20px)' },
          '100%': { opacity: '0.4', transform: 'scale(1) translate(-20px, 20px)' },
        }
      }
    },
  },
  plugins: [],
}
