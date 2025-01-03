r/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'deep-space-blue': {
          DEFAULT: '#000066',
        },
        'electric-purple': {
          DEFAULT: '#9933FF',
        },
        'electric-teal': {
          DEFAULT: '#00FFFF',
        },
        'stark-white': {
          DEFAULT: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}

