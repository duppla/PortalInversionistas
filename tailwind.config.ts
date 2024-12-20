/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        gray: colors.zinc,
        white: '#ffffff',
        black: '#18181b',
        futuro: {
          50: '#eef4ff',
          100: '#dae6ff',
          200: '#c2d1fb',
          300: '#98b5f8',
          DEFAULT: '#5782f2',
          400: '#5782f2',
          500: '#4367ee',
          600: '#2e47e2',
          700: '#1737de',
          800: '#192eb4',
          900: '#232b85',
          950: '#1a1d51',
          dark: '#5782F2',
          darker: '#000C29'
        },
        proyeccion: {
          50: '#fff5ed',
          100: '#ffe8d4',
          200: '#ffcca8',
          300: '#ffa971',
          DEFAULT: '#ff864b',
          400: '#ff864b',
          500: '#fe5511',
          600: '#ef3b07',
          700: '#c62808',
          800: '#9d220f',
          900: '#7e1f10',
          950: '#440b06'
        },
        cimiento: {
          50: '#EFFAF4',
          100: '#D9F2E4',
          200: '#B6E4CC',
          300: '#86CFAE',
          400: '#54B38A',
          500: '#329770',
          600: '#227959',
          700: '#1B6149',
          800: '#184D3B',
          900: '#144031',
          DEFAULT: '#0B261E',
          950: '#0B261E'
        },
        sonador: {
          DEFAULT: '#EEF4FF',
          dark: '#C3CFFE',
          darker: '#97AAFD'
        },
        ilusion: {
          light: '#defae1',
          DEFAULT: '#c5f5ca',
          dark: '#8ce997'
        },
        info: {
          light: '#b2c8ff',
          DEFAULT: '#5782f2',
          dark: '#14194d'
        },
        success: {
          light: '#aee0ca',
          DEFAULT: '#54b38a',
          dark: '#123b2d'
        },
        warning: {
          light: '#ffe7bf',
          DEFAULT: '#f59e0B',
          dark: '#663300'
        },
        error: {
          light: '#ff8ba2',
          DEFAULT: '#d40d34',
          dark: '#4d0513'
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'pattern-investor': "url('https://s3.amazonaws.com/webpages-general-assets/Pattern-investor.svg')",
      },
      fontFamily: {
        'nunito-sans': ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export {}