import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opcionesRuletaConsumo } from '../data/menu';
import { playSpinStart, playSpinEnd, playSpinLoop } from '../utils/ruletaSound';

/**
 * Ruleta de la Mesa - Diseño elegante con paleta natural
 * Colores: Verde bosque, oliva, hoja, lima, arena, beige
 */
const RuletaConsumo = () => {
  const [girando, setGirando] = useState(false);
  const [decision, setDecision] = useState(null);
  const [rotacionActual, setRotacionActual] = useState(0);

  const girarRuleta = () => {
    if (girando) return;
    setGirando(true);
    setDecision(null);

    // Calcular opción aleatoria
    const indiceOpcion = Math.floor(Math.random() * opcionesRuletaConsumo.length);
    const opcionAleatoria = opcionesRuletaConsumo[indiceOpcion];

    // Calcular rotación para que el segmento quede bajo la flecha (arriba = 0°)
    const anguloSegmento = 360 / opcionesRuletaConsumo.length;
    const centroSegmento = indiceOpcion * anguloSegmento + anguloSegmento / 2;

    // Posición visual actual del centro del segmento (considerando rotación acumulada)
    const posicionActual = (centroSegmento + (rotacionActual % 360) + 360) % 360;

    // Cuánto rotar para llevar ese segmento a 0° (donde está la flecha)
    const ajuste = (360 - posicionActual) % 360;

    // Vueltas completas (6-9) + ajuste final
    const vueltas = Math.floor(6 + Math.random() * 3);
    const rotacionTotal = rotacionActual + (vueltas * 360) + ajuste;

    playSpinStart();
    const stopSpinSound = playSpinLoop({ durationMs: 4000, totalRotationDeg: rotacionTotal });
    setRotacionActual(rotacionTotal);

    // Duración exacta igual a la animación (4 segundos)
    setTimeout(() => {
      stopSpinSound();
      playSpinEnd();
      setDecision(opcionAleatoria);
      setGirando(false);
    }, 4000);
  };

  const reiniciar = () => {
    setDecision(null);
  };

  // Configuración de la ruleta
  const numSegmentos = opcionesRuletaConsumo.length;
  const anguloSegmento = 360 / numSegmentos;
  const tamanoRuleta = 280;
  const radioTexto = tamanoRuleta * 0.38;

  // Colores alternados para segmentos
  const colorSegmento = (i) => i % 2 === 0 ? '#1F4B3F' : '#3E6B5A';

  return (
    <div className="min-h-[calc(100vh-9rem)] bg-arena flex flex-col items-center justify-center px-4 py-6">

      {/* Título elegante */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-xl md:text-2xl font-bold text-verde-negro tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          ¿No saben qué tomar?
        </h1>
        <p className="text-verde-negro/70 text-sm mt-1">¡Deja que la suerte decida la siguiente ronda!</p>
      </motion.div>

      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl">

        {/* Panel izquierdo - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block bg-beige rounded-xl p-4 shadow-lg border-2 border-hoja/30"
          style={{ minWidth: '180px' }}
        >
          <h3 className="text-bosque font-bold text-xs uppercase tracking-wider mb-3 text-center border-b border-hoja/30 pb-2">
            Opciones
          </h3>
          <div className="space-y-2">
            {opcionesRuletaConsumo.slice(0, 4).map((opcion, i) => (
              <div key={opcion.id + '-l-' + i} className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded flex items-center justify-center text-beige text-sm font-bold shadow"
                  style={{ backgroundColor: colorSegmento(i) }}
                >
                  {i + 1}
                </span>
                <span className="text-verde-negro text-sm font-medium">{opcion.corto}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ruleta central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
          style={{ width: tamanoRuleta + 40, height: tamanoRuleta + 40 }}
        >
          {/* Flecha indicadora */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30">
            <div
              className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent"
              style={{
                borderTopColor: '#1E2F2A',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
              }}
            />
          </div>

          {/* Marco exterior decorativo */}
          <div
            className="absolute inset-0 rounded-full shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #7FB77E 0%, #3E6B5A 50%, #1F4B3F 100%)',
              padding: '8px'
            }}
          >
            {/* Borde interior beige */}
            <div className="w-full h-full rounded-full bg-beige p-2">

              {/* Ruleta giratoria */}
              <motion.div
                className="w-full h-full rounded-full overflow-hidden relative"
                animate={{ rotate: rotacionActual }}
                transition={{
                  duration: girando ? 4 : 0,
                  ease: [0.2, 0.8, 0.3, 1],
                }}
                style={{
                  background: `conic-gradient(${opcionesRuletaConsumo.map((_, i) => {
                    const color = colorSegmento(i);
                    return `${color} ${i * anguloSegmento}deg ${(i + 1) * anguloSegmento}deg`;
                  }).join(', ')})`,
                }}
              >
                {/* Líneas divisorias */}
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${tamanoRuleta} ${tamanoRuleta}`}>
                  {opcionesRuletaConsumo.map((_, i) => {
                    const angulo = i * anguloSegmento;
                    const rad = (angulo - 90) * (Math.PI / 180);
                    const x2 = tamanoRuleta / 2 + Math.cos(rad) * (tamanoRuleta / 2);
                    const y2 = tamanoRuleta / 2 + Math.sin(rad) * (tamanoRuleta / 2);
                    return (
                      <line
                        key={i}
                        x1={tamanoRuleta / 2}
                        y1={tamanoRuleta / 2}
                        x2={x2}
                        y2={y2}
                        stroke="#BFD8B8"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                    );
                  })}
                </svg>

                {/* Números en cada segmento */}
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${tamanoRuleta} ${tamanoRuleta}`}>
                  {opcionesRuletaConsumo.map((_, index) => {
                    const angulo = index * anguloSegmento + anguloSegmento / 2 - 90;
                    const rad = (angulo * Math.PI) / 180;
                    const cx = tamanoRuleta / 2 + Math.cos(rad) * radioTexto;
                    const cy = tamanoRuleta / 2 + Math.sin(rad) * radioTexto;
                    return (
                      <text
                        key={index}
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#E6DAC6"
                        fontSize="32"
                        fontWeight="800"
                        fontFamily="Montserrat, sans-serif"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}
                      >
                        {index + 1}
                      </text>
                    );
                  })}
                </svg>
              </motion.div>

              {/* Botón central SPIN */}
              <button
                onClick={girarRuleta}
                disabled={girando}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 z-20"
                style={{
                  backgroundColor: girando ? '#6B8E7D' : '#1F4B3F',
                  border: '4px solid #7FB77E',
                  boxShadow: '0 6px 20px rgba(31, 75, 63, 0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
                  cursor: girando ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!girando) e.target.style.backgroundColor = '#3E6B5A';
                }}
                onMouseLeave={(e) => {
                  if (!girando) e.target.style.backgroundColor = '#1F4B3F';
                }}
              >
                <span
                  className="text-beige font-bold text-lg tracking-wider"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {girando ? '...' : 'SPIN'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Panel derecho - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block bg-beige rounded-xl p-4 shadow-lg border-2 border-hoja/30"
          style={{ minWidth: '180px' }}
        >
          <h3 className="text-bosque font-bold text-xs uppercase tracking-wider mb-3 text-center border-b border-hoja/30 pb-2">
            Opciones
          </h3>
          <div className="space-y-2">
            {opcionesRuletaConsumo.slice(4).map((opcion, i) => (
              <div key={opcion.id + '-r-' + i} className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded flex items-center justify-center text-beige text-sm font-bold shadow"
                  style={{ backgroundColor: colorSegmento(i + 4) }}
                >
                  {i + 5}
                </span>
                <span className="text-verde-negro text-sm font-medium">{opcion.corto}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Área de resultado - entre ruleta y opciones */}
      <div className="mt-4 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {decision && !girando && (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="p-5 rounded-xl text-center shadow-xl border-2"
              style={{
                backgroundColor: '#1F4B3F',
                borderColor: '#7FB77E'
              }}
            >
              <div className="text-3xl mb-2">🎲</div>
              <p className="text-beige font-bold text-lg mb-1">Decisión de la Mesa</p>
              <p className="text-lima font-semibold text-lg">{decision.texto}</p>
              <button
                onClick={reiniciar}
                className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: '#E6DAC6',
                  color: '#1F4B3F',
                  border: '2px solid #7FB77E'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#BFD8B8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#E6DAC6'}
              >
                Girar de nuevo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Leyenda móvil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:hidden mt-4 w-full max-w-md"
      >
        <div className="bg-beige rounded-xl p-4 shadow-lg border-2 border-hoja/30">
          <h3 className="text-bosque font-bold text-xs uppercase tracking-wider mb-3 text-center">Opciones</h3>
          <div className="grid grid-cols-2 gap-2">
            {opcionesRuletaConsumo.map((opcion, i) => (
              <div key={opcion.id + '-m-' + i} className="flex items-center gap-2 bg-arena/50 rounded-lg px-2 py-1.5">
                <span
                  className="w-6 h-6 rounded flex items-center justify-center text-beige text-xs font-bold"
                  style={{ backgroundColor: colorSegmento(i) }}
                >
                  {i + 1}
                </span>
                <span className="text-verde-negro text-sm font-medium truncate">{opcion.corto}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RuletaConsumo;
