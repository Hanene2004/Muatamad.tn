/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tunisian: {
          red: '#DC2626',
          gold: '#F59E0B',
          navy: '#1E40AF',
          green: '#059669',
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        softui: {
          primary: '#5e72e4', // bleu principal Soft UI
          secondary: '#8392ab',
          info: '#11cdef',
          success: '#2dce89',
          warning: '#fb6340',
          danger: '#f5365c',
          light: '#f8f9fe',
          dark: '#172b4d',
          white: '#fff',
          card: '#ffffff',
          border: '#e9ecef',
          accent: '#f4f5fb',
        },
      },
      boxShadow: {
        soft: '0 4px 24px 0 rgba(34, 41, 47, 0.08)',
        softxl: '0 8px 32px 0 rgba(34, 41, 47, 0.12)',
      },
      borderRadius: {
        soft: '1.25rem', // 20px
        softxl: '2rem', // 32px
      },
      fontFamily: {
        'arabic': ['Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};