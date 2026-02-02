/**
 * Fondo Tropical - Imagen tipo patrón de hojas tropicales, fondo oscuro pero visible
 * Mantiene: overlay oscuro, luz cálida de adorno
 */

// Imagen de fondo: patrón denso de hojas tropicales (tu foto en public/)
const BG_LEAVES = '/bg-tropical-leaves.png';

const FondoTropical = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Imagen principal: hojas tropicales (patrón denso, fondo oscuro) */}
    <div className="absolute inset-0">
      <img
        src={BG_LEAVES}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        style={{ filter: 'brightness(0.28) contrast(1.05) saturate(0.9) blur(19px)' }}
        loading="eager"
        fetchPriority="high"
      />
    </div>
    {/* Overlay: tono oscuro, imagen difuminada */}
    <div
      className="absolute inset-0 bg-black/70"
      aria-hidden
    />
    {/* Luz cálida de adorno - sutil (se mantiene el diseño) */}
    <div
      className="absolute top-[15%] right-[10%] w-[min(80vw,420px)] h-[min(80vw,420px)] rounded-full blur-[100px] opacity-25"
      style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.15) 40%, transparent 70%)' }}
      aria-hidden
    />
    <div
      className="absolute bottom-[20%] left-[5%] w-[min(60vw,320px)] h-[min(60vw,320px)] rounded-full blur-[80px] opacity-20"
      style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, transparent 65%)' }}
      aria-hidden
    />
  </div>
);

export default FondoTropical;
