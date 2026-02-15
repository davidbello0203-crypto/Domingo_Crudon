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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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

          {/* Hamburger — visible hasta lg */}
          <button
            className="lg:hidden text-crudon-cream"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-label="Menú de navegación"
            style={{ padding: '0.5rem' }}
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
            onClick={(e) => { e.preventDefault(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); }}
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
  const [categoriaActiva, setCategoriaActiva] = useState('bebidas');

  // Obtener categorías de comida para el tab activo
  const seccionActiva = seccionesCrudon.find((s) => s.id === categoriaActiva);
  const categorias = seccionActiva
    ? seccionActiva.categoriaIds
        .map((id) => menuCrudon.categorias.find((c) => c.id === id))
        .filter(Boolean)
    : [];

  const esBebidas = categoriaActiva === 'bebidas';

  return (
    <section id="menu" className="snap-section bg-crudon-dark flex flex-col justify-center" style={{ minHeight: '100vh', minHeight: '100dvh', paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
      <div
        className="mx-auto w-full"
        style={{ maxWidth: '40rem', padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 3vw, 1.5rem)' }}
      >
        {/* Header */}
        <Reveal direction="up">
          <div className="text-center" style={{ marginBottom: 'clamp(1.5rem, 3vw, 3rem)' }}>
            <p
              className="font-crudon-body text-crudon-dorado uppercase"
              style={{ fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: 'clamp(0.5rem, 1vw, 1rem)' }}
            >
              Nuestro Menú
            </p>
            <h2
              className="font-crudon-title text-crudon-cream font-bold"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw + 0.5rem, 3.25rem)', marginBottom: 'clamp(0.5rem, 1vw, 1rem)' }}
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
        <div className="flex justify-center flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 1rem)', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
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
              style={{ padding: '0.5rem 1rem', fontSize: 'clamp(0.6875rem, 1vw + 0.125rem, 0.875rem)' }}
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
            >
              {menuCrudon.bebidas.map((grupo) => (
                <div key={grupo.id} style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                  <h4
                    className="font-crudon-body text-crudon-dorado tracking-wider uppercase border-b border-crudon-dorado/30"
                    style={{ fontSize: '0.75rem', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}
                  >
                    {grupo.nombre}
                  </h4>
                  <div className={grupo.id === 'refrescos' ? 'grid' : 'flex flex-col'} style={grupo.id === 'refrescos' ? { gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.25rem 1rem' } : { gap: '0.125rem' }}>
                    {grupo.productos.map((p) => (
                      <div key={p.id} className={`flex justify-between items-center ${grupo.id !== 'refrescos' ? 'border-b border-crudon-madera/20' : ''}`} style={{ padding: '0.3rem 0' }}>
                        <span className="font-crudon-body text-crudon-cream/80" style={{ fontSize: '0.8125rem' }}>
                          {p.nombre}
                        </span>
                        {p.precio > 0 && (
                          <span className="font-crudon-body text-crudon-ocre font-medium" style={{ fontSize: '0.8125rem' }}>
                            ${p.precio}
                          </span>
                        )}
                      </div>
                    ))}
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
            >
              {categorias.length > 0 && categorias.some((c) => c.productos.length > 0) ? (
                categorias.map((cat) => (
                  <div key={cat.id} style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
                    <h4
                      className="font-crudon-body text-crudon-dorado tracking-wider uppercase border-b border-crudon-dorado/30"
                      style={{ fontSize: '0.75rem', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}
                    >
                      {cat.nombre}
                    </h4>
                    {cat.descripcion && (
                      <p className="font-crudon-body text-crudon-beige/50" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                        {cat.descripcion}
                      </p>
                    )}
                    {cat.productos.length > 0 ? (
                      <div className="flex flex-col" style={{ gap: '0.25rem' }}>
                        {cat.productos.map((p) => (
                          <div key={p.id} className="border-b border-crudon-madera/20" style={{ padding: '0.5rem 0' }}>
                            <div className="flex justify-between items-center">
                              <span className="font-crudon-body text-crudon-cream font-medium" style={{ fontSize: '0.875rem' }}>
                                {p.nombre}
                              </span>
                              {p.precio > 0 && (
                                <span className="font-crudon-body text-crudon-ocre font-semibold" style={{ fontSize: '0.875rem' }}>
                                  ${p.precio}
                                </span>
                              )}
                            </div>
                            {p.descripcion && (
                              <p className="font-crudon-body text-crudon-beige/50" style={{ fontSize: '0.75rem', marginTop: '0.125rem' }}>
                                {p.descripcion}
                              </p>
                            )}
                            {p.promo && (
                              <span
                                className="inline-block bg-crudon-dorado/20 text-crudon-dorado font-crudon-body font-semibold rounded-sm"
                                style={{ fontSize: '0.6875rem', padding: '0.15rem 0.5rem', marginTop: '0.25rem' }}
                              >
                                {p.promo}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="bg-crudon-madera/20 border border-crudon-dorado/20 rounded-sm text-center" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
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
      </div>
    </section>
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
