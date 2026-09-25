import { useEffect, useRef } from 'react';

// These values are intentionally kept together so the visual can be tuned easily.
const PARTICLE_CONFIG = {
  desktopCount: 46,
  mobileCount: 24,
  color: '#d6222a',
  particleOpacity: 0.42,
  driftSpeed: 0.0007,
  interactionRadius: 185,
  interactionStrength: 34,
  linkDistance: 125,
  linkOpacity: 0.13,
};

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  size: number;
  phase: number;
  speed: number;
};

type Pointer = {
  x: number;
  y: number;
  active: boolean;
};

function HemoglobinField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const pointer: Pointer = { x: -1000, y: -1000, active: false };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    // Keep the canvas sharp on high-density screens without creating a huge workload.
    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const isMobile = width < 700;
      const count = isMobile ? PARTICLE_CONFIG.mobileCount : PARTICLE_CONFIG.desktopCount;
      particles = Array.from({ length: count }, (_, index) => {
        const x = ((index * 137.5) % (width + 180)) - 90;
        const y = ((index * 223.7) % (height + 180)) - 90;
        return {
          x,
          y,
          homeX: x,
          homeY: y,
          size: isMobile ? 4.5 + (index % 3) : 5 + (index % 4) * 1.1,
          phase: index * 1.73,
          speed: PARTICLE_CONFIG.driftSpeed + (index % 5) * 0.00012,
        };
      });
    };

    // A soft radial gradient gives each particle a raised edge and a shallow center.
    const drawHemoglobin = (particle: Particle, time: number) => {
      const driftX = Math.sin(time * particle.speed + particle.phase) * 9;
      const driftY = Math.cos(time * particle.speed * 1.2 + particle.phase) * 7;
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const influence = pointer.active
        ? Math.max(0, 1 - distance / PARTICLE_CONFIG.interactionRadius)
        : 0;
      const force = influence * PARTICLE_CONFIG.interactionStrength;
      const targetX = particle.homeX + driftX + (distance ? (dx / distance) * force : 0);
      const targetY = particle.homeY + driftY + (distance ? (dy / distance) * force : 0);

      // Spring-like easing makes particles return naturally instead of snapping.
      particle.x += (targetX - particle.x) * 0.035;
      particle.y += (targetY - particle.y) * 0.035;

      const radius = particle.size;
      const gradient = context.createRadialGradient(
        particle.x - radius * 0.28,
        particle.y - radius * 0.3,
        radius * 0.08,
        particle.x,
        particle.y,
        radius,
      );
      gradient.addColorStop(0, `rgba(255, 174, 174, ${PARTICLE_CONFIG.particleOpacity * 0.9})`);
      gradient.addColorStop(0.42, `rgba(224, 49, 57, ${PARTICLE_CONFIG.particleOpacity})`);
      gradient.addColorStop(0.78, `rgba(144, 12, 23, ${PARTICLE_CONFIG.particleOpacity * 0.95})`);
      gradient.addColorStop(1, 'rgba(91, 8, 16, 0)');

      context.save();
      context.globalAlpha = 0.7 + influence * 0.3;
      context.shadowColor = PARTICLE_CONFIG.color;
      context.shadowBlur = 9 + influence * 8;
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    // Thin links add a subtle biological-network quality without dominating the page.
    const drawLinks = () => {
      context.save();
      context.lineWidth = 0.6;
      particles.forEach((particle, index) => {
        particles.slice(index + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance >= PARTICLE_CONFIG.linkDistance) return;
          context.globalAlpha = (1 - distance / PARTICLE_CONFIG.linkDistance) * PARTICLE_CONFIG.linkOpacity;
          context.strokeStyle = PARTICLE_CONFIG.color;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        });
      });
      context.restore();
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      drawLinks();
      particles.forEach((particle) => drawHemoglobin(particle, reduceMotion ? 0 : time));
      if (!reduceMotion) animationFrame = requestAnimationFrame(render);
    };

    const updatePointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const updateTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      pointer.x = touch.clientX;
      pointer.y = touch.clientY;
      pointer.active = true;
    };
    const clearPointer = () => {
      pointer.active = false;
    };

    resizeCanvas();
    render(0);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('touchmove', updateTouch, { passive: true });
    window.addEventListener('pointerleave', clearPointer);
    window.addEventListener('pointerup', clearPointer);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('touchmove', updateTouch);
      window.removeEventListener('pointerleave', clearPointer);
      window.removeEventListener('pointerup', clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="hemoglobin-field" aria-hidden="true" />;
}

export default HemoglobinField;
