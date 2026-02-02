import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData, seccionesMenu } from '../data/menu';
import FondoTropical from './FondoTropical';

const DATOS_TRANSFERENCIA = {
  banco: 'BBVA',
  numeroTarjeta: '4152 3142 3861 4344',
  titular: 'Carlos Sinai Martinez',
};

const Menu = ({ onAbrirTransferencia, onSeccionChange, initialSeccion }) => {
  const [seccionActiva, setSeccionActiva] = useState(initialSeccion ?? 'bebidas');
  const seccion = seccionesMenu.find((s) => s.id === seccionActiva);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef({});
  const [copiadoTarjeta, setCopiadoTarjeta] = useState(false);

  const copiarTarjeta = () => {
    const texto = DATOS_TRANSFERENCIA.numeroTarjeta.replace(/\s/g, '');
    navigator.clipboard.writeText(texto).then(() => {
      setCopiadoTarjeta(true);
      setTimeout(() => setCopiadoTarjeta(false), 2000);
    });
  };

  // Al volver al menú desde otra vista, el componente se monta de nuevo con initialSeccion;
  // no sincronizar en cada cambio de initialSeccion para no pisar la selección del usuario.

  // Notificar a App la sección activa (para ocultar barra de envíos en Botellas y Copeo)
  useEffect(() => {
    onSeccionChange?.(seccionActiva);
  }, [seccionActiva, onSeccionChange]);

  // Centrar la pestaña seleccionada automáticamente
  useEffect(() => {
    const container = tabsContainerRef.current;
    const activeTab = tabRefs.current[seccionActiva];

    if (container && activeTab) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      // Calcular el scroll necesario para centrar la pestaña
      const scrollLeft = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [seccionActiva]);

  // Respetar orden de las fotos del menú (categoriaIds)
  const categoriasEnSeccion = useMemo(() => {
    if (!seccion) return [];
    return seccion.categoriaIds
      .map((id) => menuData.categorias.find((c) => c.id === id))
      .filter(Boolean);
  }, [seccion]);

  const formatPrecio = (n) => `$${Number(n).toFixed(2)}`;

  const PrecioDisplay = ({ producto }) => {
    const abrirTransferencia = (e) => {
      e.stopPropagation();
      onAbrirTransferencia?.();
    };
    const clasePrecio = 'inline-flex items-center px-3 py-1.5 rounded-lg bg-menu-cream text-menu-green-bar text-xs font-bold cursor-pointer hover:bg-white active:scale-[0.98] transition-all shadow-md';
    const muchosPrecios = producto.precios && producto.precios.length >= 4;
    if (producto.precios && producto.precios.length > 0) {
      return (
        <div className={muchosPrecios ? 'w-full mt-2' : 'flex flex-wrap gap-1.5 justify-end'}>
          <div className={`flex flex-wrap ${muchosPrecios ? 'gap-2 justify-start' : 'gap-1.5 justify-end'}`}>
            {producto.precios.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={abrirTransferencia}
                className={clasePrecio}
                title="Ver datos para transferencia"
              >
                {p.etiqueta} {formatPrecio(p.precio)}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return (
      <button
        type="button"
        onClick={abrirTransferencia}
        className={clasePrecio + ' whitespace-nowrap'}
        title="Ver datos para transferencia"
      >
        {formatPrecio(producto.precio)}
      </button>
    );
  };

  const mitad = Math.ceil(categoriasEnSeccion.length / 2);
  const colIzq = categoriasEnSeccion.slice(0, mitad);
  const colDer = categoriasEnSeccion.slice(mitad);
  const usarDosColumnas = seccionActiva === 'bebidas' && categoriasEnSeccion.length > 4;

  const BloqueCategoria = ({ cat, index }) => {
    // Alternar colores de fondo para las tarjetas de productos
    const esClara = index % 2 === 0;

    return (
      <section className="space-y-3">
        {/* Header de categoría - mismo verde que tabs activos */}
        <div className="px-4 py-2.5 rounded-xl flex items-center gap-2 bg-menu-green-bar shadow-lg">
          <span className="text-base">🍃</span>
          <h2 className="font-slab text-base font-bold uppercase tracking-wide text-menu-cream">
            {cat.nombre}
          </h2>
        </div>
        {cat.descripcionCategoria && cat.productos.length > 0 && (
          <p className="text-xs italic text-menu-cream/70 px-1">{cat.descripcionCategoria}</p>
        )}
        {cat.productos.length === 0 && cat.descripcionCategoria && (
          <div className={`px-4 py-3 rounded-xl backdrop-blur-sm border text-center ${esClara ? 'bg-menu-cream/50 border-menu-green-dark/20' : 'bg-menu-green-dark/60 border-menu-cream/15'}`}>
            <p className={`font-slab font-semibold text-sm uppercase tracking-wide mb-1 ${esClara ? 'text-menu-green-dark' : 'text-menu-cream'}`}>Elige tu salsa</p>
            <p className={`text-sm font-medium ${esClara ? 'text-menu-green-dark/80' : 'text-menu-cream/90'}`}>{cat.descripcionCategoria}</p>
          </div>
        )}
        <div className="space-y-2">
          {cat.productos.map((producto, indexProd) => {
            const muchasOpciones = producto.precios && producto.precios.length >= 4;
            return (
              <motion.div
                key={producto.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: indexProd * 0.03, duration: 0.25 }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className={`flex flex-wrap items-start justify-between gap-2 rounded-xl backdrop-blur-sm ${
                  muchasOpciones ? 'p-3 pb-4' : 'p-3'
                } ${
                  esClara
                    ? 'bg-menu-cream/50 border border-menu-green-dark/20'
                    : 'bg-menu-green-dark/60 border border-menu-cream/15'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <h3 className={`font-body font-semibold text-sm ${esClara ? 'text-menu-green-dark' : 'text-menu-cream'}`}>{producto.nombre}</h3>
                  {producto.descripcion && (
                    <p className={`text-xs mt-0.5 ${esClara ? 'text-menu-green-dark/70' : 'text-menu-cream/65'}`}>{producto.descripcion}</p>
                  )}
                </div>
                <PrecioDisplay producto={producto} />
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="bg-black pt-4 pb-8 min-h-[calc(100vh-68px)] relative overflow-hidden">
      <FondoTropical />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Portada estilo menú: logo + MENU + redes */}
        <motion.div
          className="text-center mb-6 mt-2"
          initial="oculto"
          animate="visible"
          variants={{
            oculto: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{ oculto: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.35 }}
            className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-menu-cream mb-4"
          >
            <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">THE</span>
            <span className="text-menu-cream font-script text-2xl font-semibold">Green</span>
            <span className="text-menu-cream text-[9px] tracking-[0.2em] font-body uppercase">GARDEN</span>
          </motion.div>
          <motion.div
            variants={{ oculto: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-2 mb-1"
          >
            <span className="text-green-light/80 text-lg">🍃</span>
            <h1 className="font-slab text-4xl md:text-5xl font-bold text-menu-cream tracking-tight uppercase">
              MENU
            </h1>
            <span className="text-green-light/80 text-lg">🍃</span>
          </motion.div>
          <motion.p
            variants={{ oculto: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            className="text-menu-cream/70 text-xs font-body mt-2"
          >
            The Green Garden
          </motion.p>
        </motion.div>

        {/* Tabs: se abre aquí mismo, transición suave */}
        <motion.div
          ref={tabsContainerRef}
          className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {seccionesMenu.map((sec, i) => {
            const estaActiva = seccionActiva === sec.id;
            const idSeccion = sec.id;
            return (
              <motion.button
                type="button"
                key={sec.id}
                ref={(el) => (tabRefs.current[sec.id] = el)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSeccionActiva(idSeccion);
                }}
                className={`px-6 py-3.5 rounded-xl whitespace-nowrap font-slab font-semibold text-lg transition-colors shrink-0 ${
                  estaActiva
                    ? 'bg-menu-green-bar text-menu-cream shadow-md'
                    : 'bg-menu-cream text-menu-green-dark hover:bg-menu-green-bar/30 hover:text-menu-cream'
                }`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {sec.icono} {sec.nombre}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {seccion && (
            <motion.div
              key={seccionActiva}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Imagen de la sección: formato landscape, overlay estilo página */}
              {seccion.imagen && (
                <motion.div
                  className="rounded-2xl overflow-hidden border-2 border-menu-cream/25 shadow-xl relative"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                >
                  <img
                    src={seccion.imagen}
                    alt={seccion.nombre}
                    className="w-full h-52 sm:h-64 object-cover object-center"
                  />
                  {/* Overlay muy sutil para no tapar la foto */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ background: 'linear-gradient(180deg, rgba(21, 42, 34, 0.12) 0%, transparent 60%, rgba(21, 42, 34, 0.08) 100%)' }}
                    aria-hidden
                  />
                </motion.div>
              )}

              {usarDosColumnas ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {colIzq.map((cat) => (
                      <BloqueCategoria key={cat.id} cat={cat} />
                    ))}
                  </div>
                  <div className="space-y-6">
                    {colDer.map((cat) => (
                      <BloqueCategoria key={cat.id} cat={cat} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {categoriasEnSeccion.map((cat) => (
                    <BloqueCategoria key={cat.id} cat={cat} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sección de datos de transferencia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-10 mb-4"
        >
          <div className="bg-menu-green-dark/80 backdrop-blur-sm rounded-2xl border border-menu-cream/20 p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-menu-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="font-slab font-bold text-menu-cream text-sm uppercase tracking-wide">
                Datos para transferencia
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-menu-cream/60">Banco</span>
                <span className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.banco}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-menu-cream/60">Titular</span>
                <span className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.titular}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-menu-cream/60">Número de tarjeta</span>
                </div>
                <div className="bg-menu-cream/10 rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-menu-cream font-mono tracking-wider">{DATOS_TRANSFERENCIA.numeroTarjeta}</span>
                </div>
                <button
                  onClick={copiarTarjeta}
                  className="mt-2 w-full py-2.5 rounded-lg bg-menu-cream text-menu-green-dark font-semibold text-sm hover:bg-white transition-colors"
                >
                  {copiadoTarjeta ? '¡Copiado!' : 'Copiar número de tarjeta'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
