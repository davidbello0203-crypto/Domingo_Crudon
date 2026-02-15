/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    /* ── Breakpoints Mobile First (em para accesibilidad) ── */
    screens: {
      sm: '37.5em',   /* 600px  — Tablet */
      md: '48em',     /* 768px  — Tablet landscape */
      lg: '64em',     /* 1024px — Desktop */
      xl: '80em',     /* 1280px — Desktop grande */
    },
    extend: {
      colors: {
        'crudon-bg': '#1a1611',
        'crudon-dark': '#0f0c09',
        'crudon-tierra': '#8B4513',
        'crudon-ocre': '#C4A35A',
        'crudon-terracota': '#A0522D',
        'crudon-cream': '#F5E6D3',
        'crudon-beige': '#E8DCC8',
        'crudon-madera': '#5D4037',
        'crudon-verde': '#4A5D4A',
        'crudon-dorado': '#D4A84B',
      },
      fontFamily: {
        'crudon-title': ['Playfair Display', 'serif'],
        'crudon-script': ['Cormorant Garamond', 'serif'],
        'crudon-body': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        /* Escala fluida: clamp(min, preferred, max) */
        'hero':    'clamp(2.25rem, 6vw + 1rem, 5.5rem)',
        'hero-sub':'clamp(1.75rem, 4vw + 0.5rem, 4rem)',
        'display': 'clamp(1.75rem, 3vw + 0.5rem, 3.25rem)',
        'heading': 'clamp(1.25rem, 2vw + 0.5rem, 2rem)',
      },
      spacing: {
        'section': 'clamp(3rem, 6vw, 6rem)',
      },
    },
  },
  plugins: [],
}
