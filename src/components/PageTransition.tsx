'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import styles from './PageTransition.module.css';

/**
 * Transition de page fluide : un voile chrome balaie l'écran à l'entrée,
 * puis se retire. À placer en haut de la page.
 */
export default function PageTransition() {
  useEffect(() => {
    const veil = document.querySelector<HTMLElement>(`.${styles.veil}`);
    if (!veil) return;

    const tl = gsap.timeline();
    tl.fromTo(
      veil,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.5, ease: 'power2.inOut' },
    ).to(veil, {
      xPercent: 100,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        veil.style.display = 'none';
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return <div className={styles.veil} aria-hidden="true" />;
}