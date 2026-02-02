import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATOS_TRANSFERENCIA = {
  banco: 'BBVA',
  numeroTarjeta: '4152 3142 3861 4344',
  titular: 'Carlos Sinai Martinez',
};

const BurbujaTransferencia = ({ abierto: abiertoExterno, onToggle }) => {
  const [abiertoInterno, setAbiertoInterno] = useState(false);
  const esControlado = abiertoExterno !== undefined && typeof onToggle === 'function';
  const abierto = esControlado ? abiertoExterno : abiertoInterno;
  const setAbierto = esControlado ? onToggle : setAbiertoInterno;
  const [copiadoTarjeta, setCopiadoTarjeta] = useState(false);
  const refPanel = useRef(null);

  const copiarTarjeta = () => {
    const texto = DATOS_TRANSFERENCIA.numeroTarjeta.replace(/\s/g, '');
    navigator.clipboard.writeText(texto).then(() => {
      setCopiadoTarjeta(true);
      setTimeout(() => setCopiadoTarjeta(false), 2000);
    });
  };

  useEffect(() => {
    const cerrarAlClicFuera = (e) => {
      if (refPanel.current && !refPanel.current.contains(e.target)) setAbierto(false);
    };
    if (abierto) document.addEventListener('click', cerrarAlClicFuera);
    return () => document.removeEventListener('click', cerrarAlClicFuera);
  }, [abierto, setAbierto]);

  return (
    <div ref={refPanel} className="fixed bottom-32 right-3 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-80 max-w-[calc(100vw-2rem)] rounded-2xl border-2 border-menu-cream/30 bg-menu-green-dark shadow-xl overflow-hidden"
          >
            <div className="px-5 py-4 bg-menu-green-bar border-b border-menu-cream/20">
              <h3 className="font-slab font-bold text-menu-cream text-base uppercase tracking-wide">
                Datos de transferencia
              </h3>
            </div>
            <div className="p-5 space-y-4 text-base font-body">
              <div>
                <p className="text-menu-cream/60 text-sm uppercase tracking-wider">Banco</p>
                <p className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.banco}</p>
              </div>
              <div>
                <p className="text-menu-cream/60 text-sm uppercase tracking-wider">Número de tarjeta</p>
                <p className="text-menu-cream font-mono text-lg tracking-wider">{DATOS_TRANSFERENCIA.numeroTarjeta}</p>
                <button
                  type="button"
                  onClick={copiarTarjeta}
                  className="mt-2 w-full py-2.5 rounded-lg bg-menu-cream text-menu-green-dark font-semibold text-sm hover:bg-menu-cream-light transition-colors"
                >
                  {copiadoTarjeta ? '¡Copiado!' : 'Copiar número de tarjeta'}
                </button>
              </div>
              <div>
                <p className="text-menu-cream/60 text-sm uppercase tracking-wider">Titular</p>
                <p className="text-menu-cream font-medium">{DATOS_TRANSFERENCIA.titular}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={(e) => { e.stopPropagation(); setAbierto(!abierto); }}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-menu-cream text-menu-green-dark shadow-md border border-menu-green-dark/30 hover:bg-menu-cream-light transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ver datos de transferencia"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default BurbujaTransferencia;
