'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import type { ScrollTriggerInstance } from 'gsap/dist/ScrollTrigger.js';
import { initSmoothScroll } from '@/lib/smooth-scroll';
import styles from './FrameSequenceHero.module.css';

gsap.registerPlugin(ScrollTrigger);

// Nombre total de frames (extrait via ffmpeg à 30fps sur 5s).
const TOTAL_FRAMES = 150;
// Préchargement progressif : charge d'abord 1 frame sur N pour afficher
// rapidement quelque chose, puis complète en arrière-plan.
const STRIDE = 8;

interface FrameSequenceHeroProps {
  /** Chemin de base des frames (sans extension). */
  frameBase: string;
  /** Chemin de la vidéo de fallback (mobile / reduced-motion). */
  fallbackVideo: string;
  /** Utiliser la variante mobile (portrait) des frames. */
  mobile?: boolean;
  /** Contenu overlay (titre/CTA) superposé au canvas scroll-frame. */
  children?: React.ReactNode;
}

/**
 * Hero en scroll-frame : le scroll contrôle l'index de frame affiché sur un
 * <canvas>. Préchargement progressif pour ne pas bloquer le thread principal.
 * Fallback vidéo classique sur mobile ou prefers-reduced-motion.
 * Le contenu overlay (children) est affiché par-dessus le canvas sticky.
 */
export default function FrameSequenceHero({
  frameBase,
  fallbackVideo,
  mobile = false,
  children,
}: FrameSequenceHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [useVideo, setUseVideo] = useState(false);
  const [ready, setReady] = useState(false);

  // Détection mobile + reduced-motion → fallback vidéo.
  useEffect(() => {
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    )?.matches;
    const isMobile =
      window.innerWidth < 768 ||
      /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
    if (reduced || isMobile) {
      setUseVideo(true);
    }
  }, []);
  useEffect(() => {
    if (useVideo) return;

    const images: HTMLImageElement[] = [];
    let loaded = 0;
    let cancelled = false;

    // Passe 1 : charge 1 frame sur STRIDE pour afficher rapidement.
    const fastLoad = () => {
      for (let i = 0; i < TOTAL_FRAMES; i += STRIDE) {
        const img = new Image();
        img.src = `${frameBase}/frame_${String(i + 1).padStart(4, '0')}.jpg`;
        images[i] = img;
        img.onload = () => {
          loaded++;
          if (loaded >= Math.ceil(TOTAL_FRAMES / STRIDE) && !cancelled) {
            setReady(true);
          }
        };
      }
    };

    // Passe 2 : complète les frames manquantes en arrière-plan, par lots,
    // via requestIdleCallback pour ne pas bloquer le thread principal.
    const completeLoad = () => {
      const missing: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!images[i]) missing.push(i);
      }

      const batch = 12;
      let cursor = 0;

      const processBatch = () => {
        if (cancelled) return;
        const end = Math.min(cursor + batch, missing.length);
        for (let k = cursor; k < end; k++) {
          const idx = missing[k];
          const img = new Image();
          img.src = `${frameBase}/frame_${String(idx + 1).padStart(4, '0')}.jpg`;
          images[idx] = img;
        }
        cursor = end;
        if (cursor < missing.length) {
          (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 16)))(
            processBatch,
          );
        }
      };

      (window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 16)))(
        processBatch,
      );
    };

    fastLoad();
    completeLoad();
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [useVideo, frameBase]);

  // ScrollTrigger : contrôle l'index de frame selon la position dans la section.
  useEffect(() => {
    if (useVideo || !ready) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    initSmoothScroll();

    const drawFrame = (index: number) => {
      const img = imagesRef.current?.[index];
      if (!img || !img.complete) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Affiche la première frame dès que prête.
    drawFrame(0);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      // L'animation se déroule sur toute la hauteur étendue (300vh) :
      // on atteint la dernière frame quand le bas de la section atteint
      // le bas du viewport.
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self: ScrollTriggerInstance) => {
        const idx = Math.round(self.progress * (TOTAL_FRAMES - 1));
        drawFrame(idx);
      },
    });

    return () => {
      st.kill();
    };
  }, [useVideo, ready]);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Vidéo d'introduction">
      <div className={styles.viewport}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={mobile ? 720 : 1280}
          height={mobile ? 1280 : 720}
        />
        {useVideo && (
          <video
            className={styles.video}
            src={fallbackVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        {/* Contenu overlay superposé au canvas sticky */}
        {children && <div className={styles.overlay}>{children}</div>}
      </div>
    </section>
  );
}