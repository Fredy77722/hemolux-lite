import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  Activity,
  ArrowRight,
} from 'lucide-react';

export type HeroCarouselCard = {
  title: string;
  description: string;
  link: string;
  image?: string;
  icon: typeof Activity;
};

type HeroCarouselProps = {
  cards: HeroCarouselCard[];
  onNavigate: (id: string) => void;
};

const CAROUSEL_CONFIG = {
  perspective: 1200,
  radius: 220,
  mobileRadius: 140,
  sensitivity: 0.42,
  snapDuration: 420,
  autoRotationSpeed: 8,
};

function normalizeAngle(angle: number) {
  return ((angle + 180) % 360 + 360) % 360 - 180;
}

function HeroCarousel({ cards, onNavigate }: HeroCarouselProps) {
  const initialRotation = 0;
  const [rotation, setRotation] = useState(initialRotation);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(initialRotation);
  const targetRotationRef = useRef(initialRotation);
  const dragStartRef = useRef({ x: 0, rotation: initialRotation });
  const animationFrameRef = useRef(0);
  const interactionRef = useRef(false);
  const didDragRef = useRef(false);
  const animateRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    let previousTime = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;
      if (!interactionRef.current && !reducedMotion && cards.length > 1) {
        targetRotationRef.current += (CAROUSEL_CONFIG.autoRotationSpeed * elapsed) / 1000;
      }
      const difference = targetRotationRef.current - rotationRef.current;
      rotationRef.current += difference * 0.18;
      setRotation(rotationRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animateRef.current = () => {
      if (!animationFrameRef.current) {
        previousTime = performance.now();
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [cards.length]);

  const beginDrag = (clientX: number) => {
    didDragRef.current = false;
    interactionRef.current = true;
    dragStartRef.current = { x: clientX, rotation: targetRotationRef.current };
    setIsDragging(true);
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStartRef.current.x;
    if (Math.abs(delta) > 5) didDragRef.current = true;
    targetRotationRef.current = dragStartRef.current.rotation + delta * CAROUSEL_CONFIG.sensitivity;
    if (!animationFrameRef.current) animationFrameRef.current = requestAnimationFrame(animateRef.current);
  };

  const finishDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    interactionRef.current = false;
    const step = 360 / cards.length;
    targetRotationRef.current = Math.round(targetRotationRef.current / step) * step;
    if (!animationFrameRef.current) animationFrameRef.current = requestAnimationFrame(animateRef.current);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    stageRef.current?.setPointerCapture(event.pointerId);
    beginDrag(event.clientX);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    moveDrag(event.clientX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    stageRef.current?.releasePointerCapture(event.pointerId);
    finishDrag();
  };

  return (
    <div className="hero-carousel">
      <div
        ref={stageRef}
        className={`hero-carousel-stage${isDragging ? ' is-dragging' : ''}`}
        style={{ perspective: `${CAROUSEL_CONFIG.perspective}px` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={finishDrag}
      >
        <div className="hero-carousel-wheel" style={{ transform: `rotateY(${rotation}deg)` }}>
          {cards.map((card, index) => {
            const step = 360 / cards.length;
            const angle = (index - 2) * step;
            const relativeAngle = normalizeAngle(angle + rotation);
            const depth = Math.cos(relativeAngle * Math.PI / 180);
            const isFront = depth > 0.94;
            const Icon = card.icon;

            return (
              <article
                className={`hero-carousel-card${isFront ? ' is-front' : ''}`}
                key={card.title}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(var(--carousel-radius)) scale(${0.84 + Math.max(depth, 0) * 0.18})`,
                  opacity: 0.42 + Math.max(depth, 0) * 0.58,
                  zIndex: Math.round((depth + 1) * 10),
                }}
                onClick={() => {
                  if (!didDragRef.current) onNavigate(card.link);
                }}
              >
                <div className="hero-carousel-card-media">
                  {card.image ? <img src={card.image} alt="" /> : <Icon size={27} strokeWidth={1.7} />}
                </div>
                <div className="hero-carousel-card-content">
                  <span className="hero-carousel-kicker">{isFront ? 'SINAL DETECTADO' : 'HEMOLUX LITE'}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="hero-carousel-link">Explorar <ArrowRight size={14} /></span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="hero-carousel-hint" aria-hidden="true">
        <span className="hero-carousel-hand">↔</span>
        Arraste para explorar
      </div>
    </div>
  );
}

export default HeroCarousel;
