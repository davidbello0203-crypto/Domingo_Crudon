import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { menuCrudon, seccionesCrudon } from '../data/menuCrudon';

/* ═══════════════════════════════════════════════
   CONSTANTES
   ═══════════════════════════════════════════════ */

const SECCIONES = ['inicio', 'menu'];

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'menu', label: 'Menú' },
];

/* ═══════════════════════════════════════════════
   VARIANTES DE ANIMACIÓN
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const fadeSlide = (dir = 'left') => ({
  hidden: {
    opacity: 0,
    x: dir === 'left' ? -40 : dir === 'right' ? 40 : 0,
    y: dir === 'up' ? 30 : 0,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
});

/* ═══════════════════════════════════════════════
   REVEAL: animación al entrar en viewport
   ═══════════════════════════════════════════════ */

function Reveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const variants = fadeSlide(direction);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   HEADER — fixed, responsive
   ═══════════════════════════════════════════════ */

function Header({ seccionActiva, scrollContainerRef }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 50);
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [scrollContainerRef]);

  const navegar = useCallback((id) => {
    setMenuAbierto(false);
    const el = document.getElementById(id);
    const container = el?.closest('.snap-container');
    if (el && container) {
      container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-crudon-dark/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ padding: scrolled ? '0.5rem 0' : '0.75rem 0' }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: '72rem', padding: '0 clamp(1rem, 3vw, 1.5rem)' }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => navegar('inicio')}
            className="font-crudon-script text-crudon-cream tracking-wider"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1.25rem)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            DOMINGO CRUDON
          </motion.button>

          {/* Desktop nav — visible desde lg (1024px) */}
          <nav className="hidden lg:flex items-center" style={{ gap: 'clamp(1.25rem, 2vw, 2rem)' }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navegar(item.id)}
                className={`font-crudon-body tracking-widest uppercase transition-colors duration-300 ${
                  seccionActiva === item.id
                    ? 'text-crudon-dorado'
                    : 'text-crudon-cream/70 hover:text-crudon-cream'
                }`}
                style={{ fontSize: '0.75rem' }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Redes + Hamburger */}
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1HosqARUMy/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crudon-cream/60 hover:text-crudon-dorado transition-colors"
              aria-label="Facebook"
            >
              <svg style={{ width: '1.125rem', height: '1.125rem' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/thegreen_garden1?igsh=MWl5dGFjazV0bDhldA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-crudon-cream/60 hover:text-crudon-dorado transition-colors"
              aria-label="Instagram"
            >
              <svg style={{ width: '1.125rem', height: '1.125rem' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* Hamburger — visible hasta lg */}
            <button
              className="lg:hidden text-crudon-cream"
              onClick={() => setMenuAbierto((v) => !v)}
              aria-label="Menú de navegación"
              style={{ padding: '0.25rem', marginLeft: '0.25rem' }}
            >
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuAbierto ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 z-40 bg-crudon-dark/98 backdrop-blur-md border-b border-crudon-madera/30 lg:hidden"
            style={{ top: '3.5rem' }}
          >
            <nav className="flex flex-col" style={{ padding: '0.75rem 0' }}>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navegar(item.id)}
                  className={`font-crudon-body tracking-wider uppercase text-left transition-colors ${
                    seccionActiva === item.id
                      ? 'text-crudon-dorado bg-crudon-madera/20'
                      : 'text-crudon-cream/70'
                  }`}
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO — full viewport, responsive typography
   ═══════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section id="inicio" className="snap-section relative flex flex-col justify-between overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/imagenes/crudon-hero.png')",
          filter: 'brightness(0.5)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-crudon-dark/80 via-crudon-dark/20 to-crudon-dark" />

      {/* Content — centered vertically */}
      <div
        className="relative z-10 text-center mx-auto w-full flex-1 flex flex-col justify-center"
        style={{ padding: 'clamp(4rem, 10vw, 6rem) clamp(1rem, 4vw, 2rem) clamp(4rem, 12vw, 10rem)', maxWidth: '60rem' }}
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="font-crudon-body text-crudon-ocre uppercase"
          style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.875rem)', letterSpacing: '0.2em', marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)' }}
        >
          Birria de Borrego Estilo Jalisco
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-crudon-title text-crudon-cream font-bold leading-tight"
          style={{ fontSize: 'var(--hero-size, clamp(2.25rem, 7vw + 0.5rem, 5.5rem))', marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)', textShadow: '0.125rem 0.25rem 1.25rem rgba(0,0,0,0.5)' }}
        >
          Domingo
          <span
            className="block font-crudon-script text-crudon-dorado italic font-normal"
            style={{ fontSize: 'clamp(1.75rem, 5vw + 0.25rem, 4.5rem)', marginTop: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}
          >
            Crudon
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="font-crudon-body text-crudon-beige/80 mx-auto"
          style={{ fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.25rem)', maxWidth: '36rem', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          Auténtica tradición jalisciense con tortillas hechas a mano y el sabor que nos define
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row justify-center items-center"
          style={{ gap: 'clamp(0.625rem, 1.5vw, 1rem)', padding: '0 1rem' }}
        >
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('menu');
              const container = section?.closest('.snap-container');
              if (section && container) {
                container.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto text-center bg-crudon-dorado text-crudon-dark font-crudon-body font-semibold uppercase rounded-sm hover:bg-crudon-ocre transition-colors"
            style={{ padding: '0.75rem 2rem', fontSize: '0.875rem', letterSpacing: '0.05em' }}
          >
            Ver Menú
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
        style={{ paddingBottom: 'clamp(1rem, 3vw, 2rem)' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ fontSize: '1.25rem', opacity: 0.7 }}
        >
          👇
        </motion.div>
        <motion.p
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-gray-400 font-crudon-body"
          style={{ fontSize: '0.625rem', marginTop: '0.25rem', letterSpacing: '0.1em' }}
        >
          Desliza
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MENÚ — Grid responsivo
   ═══════════════════════════════════════════════ */

function MenuSection() {
  const [categoriaActiva, setCategoriaActiva] = useState('birria');

  // Obtener categorías de comida para el tab activo
  const seccionActiva = seccionesCrudon.find((s) => s.id === categoriaActiva);
  const categorias = seccionActiva
    ? seccionActiva.categoriaIds
        .map((id) => menuCrudon.categorias.find((c) => c.id === id))
        .filter(Boolean)
    : [];

  const esBebidas = categoriaActiva === 'bebidas';

  return (
    <section id="menu" className="snap-section bg-crudon-dark flex flex-col" style={{ minHeight: '100vh', minHeight: '100dvh', paddingTop: 'clamp(3.5rem, 7vw, 5rem)', paddingBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
      <div
        className="mx-auto w-full flex-1 flex flex-col"
        style={{ maxWidth: '40rem', padding: '0 clamp(1rem, 3vw, 1.5rem)' }}
      >
        {/* Header */}
        <Reveal direction="up">
          <div className="text-center" style={{ marginBottom: 'clamp(1rem, 2.5vw, 2rem)' }}>
            <p
              className="font-crudon-body text-crudon-dorado uppercase"
              style={{ fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: 'clamp(0.375rem, 0.75vw, 0.75rem)' }}
            >
              Nuestro Menú
            </p>
            <h2
              className="font-crudon-title text-crudon-cream font-bold"
              style={{ fontSize: 'clamp(1.625rem, 3.5vw + 0.5rem, 3rem)', marginBottom: 'clamp(0.375rem, 0.75vw, 0.75rem)' }}
            >
              Sabores de
              <span className="font-crudon-script text-crudon-ocre italic font-normal" style={{ marginLeft: '0.5rem' }}>Jalisco</span>
            </h2>
            <p
              className="font-crudon-body text-crudon-beige/60 mx-auto"
              style={{ fontSize: 'clamp(0.8125rem, 1.2vw + 0.25rem, 1rem)', maxWidth: '32rem' }}
            >
              Platillos preparados con ingredientes frescos y recetas tradicionales
            </p>
          </div>
        </Reveal>

        {/* Categorías / tabs */}
        <div className="flex justify-center flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 0.875rem)', marginBottom: 'clamp(1rem, 2.5vw, 2rem)' }}>
          {seccionesCrudon.map((seccion) => (
            <motion.button
              key={seccion.id}
              onClick={() => setCategoriaActiva(seccion.id)}
              whileTap={{ scale: 0.95 }}
              className={`font-crudon-body tracking-wider uppercase rounded-sm transition-all duration-300 ${
                categoriaActiva === seccion.id
                  ? 'bg-crudon-dorado text-crudon-dark'
                  : 'bg-crudon-madera/30 text-crudon-cream/70 hover:text-crudon-cream hover:bg-crudon-madera/50'
              }`}
              style={{ padding: '0.4375rem 1rem', fontSize: 'clamp(0.6875rem, 1vw + 0.125rem, 0.8125rem)' }}
            >
              <span style={{ marginRight: '0.375rem' }}>{seccion.icono}</span>
              {seccion.nombre}
            </motion.button>
          ))}
        </div>

        {/* Contenido según tab */}
        <AnimatePresence mode="wait">
          {esBebidas ? (
            <motion.div
              key="bebidas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
              style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}
            >
              {menuCrudon.bebidas.map((grupo) => (
                <div key={grupo.id}>
                  <h4
                    className="font-crudon-body text-crudon-dorado tracking-wider uppercase"
                    style={{ fontSize: '0.6875rem', marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)', letterSpacing: '0.15em' }}
                  >
                    — {grupo.nombre}
                  </h4>
                  <div
                    className="bg-crudon-madera/10 border border-crudon-madera/20 rounded-sm"
                    style={{ padding: 'clamp(0.625rem, 1.5vw, 1rem)' }}
                  >
                    <div className={grupo.id === 'refrescos' ? 'grid' : 'flex flex-col'} style={grupo.id === 'refrescos' ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.375rem 1.5rem' } : { gap: '0.25rem' }}>
                      {grupo.productos.map((p, i) => (
                        <div
                          key={p.id}
                          className={`flex justify-between items-center ${i < grupo.productos.length - 1 && grupo.id !== 'refrescos' ? 'border-b border-crudon-madera/15' : ''}`}
                          style={{ padding: '0.3125rem 0' }}
                        >
                          <span className="font-crudon-body text-crudon-cream/85" style={{ fontSize: '0.8125rem' }}>
                            {p.nombre}
                          </span>
                          {p.precio > 0 && (
                            <span className="font-crudon-body text-crudon-ocre font-semibold" style={{ fontSize: '0.8125rem' }}>
                              ${p.precio}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={categoriaActiva}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
              style={{ gap: 'clamp(0.625rem, 1.25vw, 0.875rem)' }}
            >
              {categorias.length > 0 && categorias.some((c) => c.productos.length > 0) ? (
                categorias.map((cat) => (
                  <div key={cat.id}>
                    {cat.productos.length > 0 ? (
                      <div className="flex flex-col" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                        {cat.productos.map((p) => (
                          <div
                            key={p.id}
                            className="bg-crudon-madera/10 border border-crudon-madera/20 rounded-sm"
                            style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(0.875rem, 2vw, 1.25rem)' }}
                          >
                            <div className="flex justify-between items-start">
                              <div style={{ flex: 1, marginRight: '0.75rem' }}>
                                <span className="font-crudon-body text-crudon-cream font-semibold" style={{ fontSize: '0.875rem' }}>
                                  {p.nombre}
                                </span>
                                {p.descripcion && (
                                  <p className="font-crudon-body text-crudon-beige/45" style={{ fontSize: '0.6875rem', lineHeight: '1.4', marginTop: '0.1875rem' }}>
                                    {p.descripcion}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col items-end" style={{ gap: '0.25rem' }}>
                                {p.precio > 0 && (
                                  <span className="font-crudon-body text-crudon-ocre font-bold" style={{ fontSize: '1rem' }}>
                                    ${p.precio}
                                  </span>
                                )}
                                {p.promo && (
                                  <span
                                    className="bg-crudon-dorado/15 text-crudon-dorado font-crudon-body font-semibold rounded-sm text-center"
                                    style={{ fontSize: '0.5625rem', padding: '0.125rem 0.4rem', whiteSpace: 'nowrap' }}
                                  >
                                    {p.promo}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="bg-crudon-madera/15 border border-crudon-dorado/15 rounded-sm text-center" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                  <p className="font-crudon-script text-crudon-dorado" style={{ fontSize: 'clamp(1rem, 2vw, 1.375rem)' }}>
                    Próximamente
                  </p>
                  <p className="font-crudon-body text-crudon-beige/50" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Estamos preparando esta sección
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Datos de transferencia */}
        <TransferenciaCard />
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════
   TRANSFERENCIA — Datos bancarios con copiar
   ═══════════════════════════════════════════════ */

const NUMERO_TARJETA = '4152314238614344';
const NUMERO_FORMATEADO = '4152 3142 3861 4344';

function TransferenciaCard() {
  const [copiado, setCopiado] = useState(false);

  const copiar = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(NUMERO_TARJETA);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = NUMERO_TARJETA;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }, []);

  return (
    <Reveal direction="up" delay={0.3}>
      <div
        className="border border-crudon-dorado/20 rounded-sm bg-crudon-madera/15"
        style={{ marginTop: 'clamp(1.25rem, 2.5vw, 2rem)', padding: 'clamp(0.75rem, 1.5vw, 1.125rem)' }}
      >
        <p
          className="font-crudon-body text-crudon-dorado uppercase text-center"
          style={{ fontSize: '0.625rem', letterSpacing: '0.15em', marginBottom: '0.375rem' }}
        >
          Datos para transferencia
        </p>
        <div className="flex items-center justify-center" style={{ gap: '0.375rem', marginBottom: '0.25rem' }}>
          <span
            className="bg-crudon-dorado/20 text-crudon-dorado font-bold rounded-sm"
            style={{ fontSize: '0.5625rem', padding: '0.1rem 0.3rem' }}
          >
            BBVA
          </span>
          <span className="font-crudon-body text-crudon-cream/50" style={{ fontSize: '0.625rem' }}>
            Visa Débito
          </span>
        </div>
        <p
          className="font-crudon-body text-crudon-cream text-center font-semibold tracking-widest"
          style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1.0625rem)', marginBottom: '0.2rem' }}
        >
          {NUMERO_FORMATEADO}
        </p>
        <p
          className="font-crudon-body text-crudon-beige/60 text-center uppercase"
          style={{ fontSize: '0.6875rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}
        >
          Carlos Sinai Martínez
        </p>

        <div className="flex justify-center">
          <motion.button
            onClick={copiar}
            whileTap={{ scale: 0.95 }}
            className={`font-crudon-body font-semibold uppercase rounded-sm transition-all duration-300 flex items-center justify-center ${
              copiado
                ? 'bg-green-600/80 text-white'
                : 'bg-crudon-dorado/20 text-crudon-dorado hover:bg-crudon-dorado/30'
            }`}
            style={{ padding: '0.375rem 1rem', fontSize: '0.6875rem', letterSpacing: '0.05em', gap: '0.3rem' }}
          >
            {copiado ? (
              <>
                <svg style={{ width: '0.875rem', height: '0.875rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Número copiado
              </>
            ) : (
              <>
                <svg style={{ width: '0.875rem', height: '0.875rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar número
              </>
            )}
          </motion.button>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════
   PÁGINA PRINCIPAL
   ═══════════════════════════════════════════════ */

export default function DomingoCrudon() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const detectarSeccion = () => {
      const scrollTop = container.scrollTop;
      const viewportH = container.clientHeight;
      const midpoint = scrollTop + viewportH / 2;

      for (const id of SECCIONES) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (midpoint >= el.offsetTop && midpoint < el.offsetTop + el.offsetHeight) {
          setSeccionActiva(id);
          break;
        }
      }
    };

    container.addEventListener('scroll', detectarSeccion, { passive: true });
    return () => container.removeEventListener('scroll', detectarSeccion);
  }, []);

  return (
    <div ref={scrollRef} className="snap-container scrollbar-hide bg-crudon-bg">
      <Header seccionActiva={seccionActiva} scrollContainerRef={scrollRef} />
      <HeroSection />
      <MenuSection />
    </div>
  );
}
