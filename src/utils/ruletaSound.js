/**
 * Sonidos para la ruleta usando Web Audio API (sin archivos externos).
 * Se activan con el primer clic del usuario (SPIN) para cumplir políticas del navegador.
 */

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Sonido al iniciar el giro (clic en SPIN)
 */
export function playSpinStart() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch (_) {}
}

/**
 * Curva de easing igual que la ruleta (framer-motion ease [0.2, 0.8, 0.3, 1]).
 * progress(t) = y del bezier con t = tiempo normalizado 0..1
 */
function easeOutCubicBezier(t) {
  const t1 = 1 - t;
  return 3 * t1 * t1 * t * 0.8 + 3 * t1 * t * t * 1 + t * t * t;
}

/**
 * Sonido mientras gira la ruleta: tics sincronizados con la rotación.
 * Usa la misma duración y curva de la animación para que cada tic coincida con un avance de ángulo.
 * @param {{ durationMs: number, totalRotationDeg: number }} opts
 * @returns {() => void} función para parar
 */
export function playSpinLoop({ durationMs, totalRotationDeg }) {
  let rafId = null;
  const segmentDeg = 36; // un tic cada 36° de rotación
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const playTick = () => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.06);
      } catch (_) {}
    };

    const startTime = performance.now();
    let lastTickAngle = 0;

    const loop = () => {
      const elapsed = (performance.now() - startTime) / durationMs;
      if (elapsed >= 1) return;

      const progress = easeOutCubicBezier(Math.min(elapsed, 1));
      const currentAngle = totalRotationDeg * progress;

      while (currentAngle >= lastTickAngle + segmentDeg) {
        lastTickAngle += segmentDeg;
        playTick();
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
  } catch (_) {}

  return () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

/**
 * Sonido al detenerse la ruleta (premio/resultado)
 */
export function playSpinEnd() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    osc.frequency.setValueAtTime(800, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (_) {}
}
