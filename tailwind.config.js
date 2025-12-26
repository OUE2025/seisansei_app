/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 0.55 },
          '50%': { opacity: 1 },
        },
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '60%': { opacity: 1, transform: 'scale(1.05)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'check-pop': {
          '0%': { opacity: 0, transform: 'scale(0.6)' },
          '80%': { opacity: 1, transform: 'scale(1.1)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'pop-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 5s ease-in-out infinite',
        'slide-down': 'slide-down 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.7s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'spin-slow': 'spin-slow 6s linear infinite',
        'bounce-in': 'bounce-in 0.7s ease-out',
        'check-pop': 'check-pop 0.35s ease-out',
        'pop-in': 'pop-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
