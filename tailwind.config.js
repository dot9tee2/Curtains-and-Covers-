/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1f2b4a',
          gold: '#f9a825',
          'navy-light': '#2a3c5e',
          'navy-dark': '#1a2340',
          'gold-light': '#fbc02d',
          'gold-dark': '#f57f17',
        },
        primary: {
          DEFAULT: '#1f2b4a',
          50: '#f4f6fb',
          100: '#e8ecf6',
          200: '#cbd7eb',
          300: '#9eb5d9',
          400: '#6a8dc2',
          500: '#476bad',
          600: '#365392',
          700: '#2d4276',
          800: '#283862',
          900: '#1f2b4a',
        },
        secondary: {
          DEFAULT: '#f9a825',
          50: '#fefcf0',
          100: '#fef7db',
          200: '#fdeeb8',
          300: '#fce085',
          400: '#f9ca50',
          500: '#f9a825',
          600: '#ed8c1b',
          700: '#c66b18',
          800: '#9d541a',
          900: '#7f4518',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 