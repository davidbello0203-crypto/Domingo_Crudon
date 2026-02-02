import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { premiosRuletaBienvenida } from '../data/menu';
import { playSpinStart, playSpinEnd, playSpinLoop } from '../utils/ruletaSound';

/**
 * Ruleta de Bienvenida - Diseño elegante con paleta natural
 * Colores: Verde bosque, oliva, hoja, lima, arena, beige
 */
const RuletaPremios = () => {
  const [girando, setGirando] = useState(false);
  const [premioGanado, setPremioGanado] = useState(null);
  const [yaGiro, setYaGiro] = useState(false);
  const [rotacionActual, setRotacionActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState('');
  const [mostrarTerminos, setMostrarTerminos] = useState(false);

  const DOCE_HORAS_MS = 12 * 60 * 60 * 1000; // 12 horas en milisegundos

  // Calcular tiempo restante hasta poder girar de nuevo
  const calcularTiempoRestante = (timestampUltimoGiro) => {
    const ahora = Date.now();
    const proximoGiro = timestampUltimoGiro + DOCE_HORAS_MS;
    const diff = proximoGiro - ahora;

    if (diff <= 0) return '00:00:00';

    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  // Verificar si ya giró en las últimas 12 horas
  useEffect(() => {
    const timestampGuardado = localStorage.getItem('ruletaBienvenidaTimestamp');
    const ahora = Date.now();

    if (timestampGuardado) {
      const tiempoPasado = ahora - parseInt(timestampGuardado);

      // Si pasaron más de 12 horas, resetear
      if (tiempoPasado >= DOCE_HORAS_MS) {
        localStorage.removeItem('ruletaBienvenidaGiro');
        localStorage.removeItem('ruletaBienvenidaPremio');
        localStorage.removeItem('ruletaBienvenidaTimestamp');
        setYaGiro(false);
        setPremioGanado(null);
      } else {
        // Aún no pasan 12 horas
        const yaGiroRuleta = localStorage.getItem('ruletaBienvenidaGiro');
        if (yaGiroRuleta === 'true') {
          setYaGiro(true);
          const premioGuardado = localStorage.getItem('ruletaBienvenidaPremio');
          if (premioGuardado) {
            setPremioGanado(JSON.parse(premioGuardado));
          }
        }
      }
    }
  }, []);

  // Actualizar contador cada segundo cuando ya giró
  useEffect(() => {
    if (!yaGiro) return;

    const timestampGuardado = parseInt(localStorage.getItem('ruletaBienvenidaTimestamp') || '0');

    const actualizar = () => {
      const tiempo = calcularTiempoRestante(timestampGuardado);
      setTiempoRestante(tiempo);

      // Si llegó a 0, resetear automáticamente
      if (tiempo === '00:00:00') {
        localStorage.removeItem('ruletaBienvenidaGiro');
        localStorage.removeItem('ruletaBienvenidaPremio');
        localStorage.removeItem('ruletaBienvenidaTimestamp');
        setYaGiro(false);
        setPremioGanado(null);
      }
    };

    actualizar();
    const intervalo = setInterval(actualizar, 1000);

    return () => clearInterval(intervalo);
  }, [yaGiro]);

  const girarRuleta = () => {
    if (yaGiro || girando) return;
    setGirando(true);
    setPremioGanado(null);

    // Calcular premio aleatorio
    const indicePremio = Math.floor(Math.random() * premiosRuletaBienvenida.length);
    const premioAleatorio = premiosRuletaBienvenida[indicePremio];

    // Calcular rotación para que el segmento quede bajo la flecha (arriba = 0°)
    const anguloSegmento = 360 / premiosRuletaBienvenida.length;
    const centroSegmento = indicePremio * anguloSegmento + anguloSegmento / 2;

    // Posición visual actual del centro del segmento (considerando rotación acumulada)
    const posicionActual = (centroSegmento + (rotacionActual % 360) + 360) % 360;

    // Cuánto rotar para llevar ese segmento a 0° (donde está la flecha)
    const ajuste = (360 - posicionActual) % 360;

    // Vueltas completas (6-9) + ajuste final
    const vueltas = Math.floor(6 + Math.random() * 3);
    const rotacionTotal = rotacionActual + (vueltas * 360) + ajuste;

    playSpinStart();
    const stopSpinSound = playSpinLoop({ durationMs: 4500, totalRotationDeg: rotacionTotal });
    setRotacionActual(rotacionTotal);

    // Duración exacta igual a la animación (4.5 segundos)
    setTimeout(() => {
      stopSpinSound();
      playSpinEnd();
      setPremioGanado(premioAleatorio);
      setGirando(false);
      setYaGiro(true);
      localStorage.setItem('ruletaBienvenidaGiro', 'true');
      localStorage.setItem('ruletaBienvenidaPremio', JSON.stringify(premioAleatorio));
      localStorage.setItem('ruletaBienvenidaTimestamp', Date.now().toString());
    }, 4500);
  };

  // Configuración de la ruleta
  const numSegmentos = premiosRuletaBienvenida.length;
  const anguloSegmento = 360 / numSegmentos;
  const tamanoRuleta = 280;
  const radioTexto = tamanoRuleta * 0.38;

  // Colores alternados para segmentos (bosque y oliva)
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
        <h1 className="text-2xl md:text-3xl font-bold text-verde-negro tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Ruleta de Bienvenida
        </h1>
        <p className="text-verde-negro/70 text-sm mt-1">Gira y obtén un premio especial</p>
      </motion.div>

      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-4xl">

        {/* Panel de premios - Desktop izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block bg-beige rounded-xl p-5 shadow-lg border-2 border-hoja/30"
          style={{ minWidth: '200px' }}
        >
          <h3 className="text-bosque font-bold text-sm uppercase tracking-wider mb-4 text-center border-b border-hoja/30 pb-2">
            Premios
          </h3>
          <div className="space-y-3">
            {premiosRuletaBienvenida.map((premio, i) => (
              <div key={premio.id} className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-beige text-base font-bold shadow-md"
                  style={{ backgroundColor: colorSegmento(i) }}
                >
                  {i + 1}
                </span>
                <span className="text-verde-negro text-base font-medium">{premio.corto}</span>
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
          {/* Flecha indicadora (arriba) */}
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
                  duration: girando ? 4.5 : 0,
                  ease: [0.2, 0.8, 0.3, 1], // Curva de desaceleración realista
                }}
                style={{
                  background: `conic-gradient(${premiosRuletaBienvenida.map((_, i) => {
                    const color = colorSegmento(i);
                    return `${color} ${i * anguloSegmento}deg ${(i + 1) * anguloSegmento}deg`;
                  }).join(', ')})`,
                }}
              >
                {/* Líneas divisorias entre segmentos */}
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${tamanoRuleta} ${tamanoRuleta}`}>
                  {premiosRuletaBienvenida.map((_, i) => {
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
                  {premiosRuletaBienvenida.map((_, index) => {
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
                        fontSize="36"
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
                disabled={yaGiro || girando}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 z-20"
                style={{
                  backgroundColor: yaGiro || girando ? '#6B8E7D' : '#1F4B3F',
                  border: '4px solid #7FB77E',
                  boxShadow: '0 6px 20px rgba(31, 75, 63, 0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
                  cursor: yaGiro || girando ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!yaGiro && !girando) e.target.style.backgroundColor = '#3E6B5A';
                }}
                onMouseLeave={(e) => {
                  if (!yaGiro && !girando) e.target.style.backgroundColor = '#1F4B3F';
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

        {/* Panel vacío para balance - Desktop derecha */}
        <div className="hidden lg:block" style={{ minWidth: '200px' }} />
      </div>

      {/* Área de resultado - entre ruleta y opciones */}
      <div className="mt-4 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {premioGanado && !girando ? (
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
              <div className="text-3xl mb-2">🎉</div>
              <p className="text-beige font-bold text-lg mb-1">¡Felicidades!</p>
              <p className="text-lima font-semibold text-lg">{premioGanado.texto}</p>
              <p className="text-beige/70 text-xs mt-3">Muestra este mensaje al mesero</p>
            </motion.div>
          ) : yaGiro && !girando ? (
            <motion.div
              key="usado"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <p className="text-verde-negro/60 text-sm">Ya utilizaste tu giro de hoy</p>
              <p className="text-verde-negro/40 text-xs mt-2">
                Próximo giro en <span className="font-mono">{tiempoRestante}</span>
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Leyenda móvil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:hidden mt-4 w-full max-w-sm"
      >
        <div className="bg-beige rounded-xl p-4 shadow-lg border-2 border-hoja/30">
          <h3 className="text-bosque font-bold text-xs uppercase tracking-wider mb-3 text-center">Premios</h3>
          <div className="grid grid-cols-2 gap-2">
            {premiosRuletaBienvenida.map((premio, i) => (
              <div key={premio.id} className="flex items-center gap-2 bg-arena/50 rounded-lg px-2 py-1.5">
                <span
                  className="w-7 h-7 rounded flex items-center justify-center text-beige text-sm font-bold"
                  style={{ backgroundColor: colorSegmento(i) }}
                >
                  {i + 1}
                </span>
                <span className="text-verde-negro text-sm font-medium truncate">{premio.corto}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Términos y condiciones */}
      <button
        onClick={() => setMostrarTerminos(true)}
        className="mt-4 text-verde-negro/50 text-[10px] text-center underline hover:text-verde-negro/70 transition-colors"
      >
        Términos y condiciones
      </button>

      {/* Modal de términos */}
      <AnimatePresence>
        {mostrarTerminos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setMostrarTerminos(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-beige rounded-xl p-5 max-w-sm w-full shadow-2xl border-2 border-hoja/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-bosque font-bold text-sm uppercase tracking-wider mb-4 text-center">
                Términos y Condiciones
              </h3>
              <ul className="text-verde-negro/80 text-xs space-y-2">
                <li className="flex gap-2">
                  <span className="text-bosque">•</span>
                  <span>Promoción válida únicamente en el establecimiento.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-bosque">•</span>
                  <span>Un giro disponible cada 12 horas por dispositivo.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-bosque">•</span>
                  <span>Aplica un solo premio por mesa.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-bosque">•</span>
                  <span>Al canjear el premio, la cuenta de la mesa no podrá dividirse.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-bosque">•</span>
                  <span>No acumulable con otras promociones.</span>
                </li>
              </ul>
              <button
                onClick={() => setMostrarTerminos(false)}
                className="mt-5 w-full py-2 rounded-lg bg-bosque text-beige font-semibold text-sm hover:bg-bosque/90 transition-colors"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RuletaPremios;
