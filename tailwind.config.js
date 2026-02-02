/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terra-bg': '#fafaf8',
        'terra-dark': '#1a2e26',
        'terra-green': '#2d5a4a',
        'terra-border': '#e8e6e1',
        'bar-dark': '#0a0a0a',
        'menu-green': '#1a3d32',
        'menu-green-dark': '#152a22',
        'menu-green-bar': '#234a3d',
        'menu-cream': '#C7BEA2',
        'menu-cream-light': '#E0DDCF',
        'menu-beige': '#D7C8B3',
        'green-primary': '#22c55e',
        'green-light': '#4ade80',
        'green-dark': '#16a34a',
        'green-accent': '#10b981',
        'green-warm': '#34d399',
        'warm-amber': '#f59e0b',
        'warm-glow': '#fbbf24',
        // Nueva paleta elegante para ruletas
        'bosque': '#1F4B3F',
        'oliva': '#3E6B5A',
        'hoja': '#7FB77E',
        'lima': '#BFD8B8',
        'arena': '#D2C2A5',
        'beige': '#E6DAC6',
        'verde-negro': '#1E2F2A',
      },
      fontFamily: {
        'slab': ['Roboto Slab', 'serif'],
        'script': ['Dancing Script', 'cursive'],
        'elegant': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
