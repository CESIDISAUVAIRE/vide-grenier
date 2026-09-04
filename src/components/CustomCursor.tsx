'use client';

import { useEffect } from 'react';
import styles from './CustomCursor.module.css';

/**
 * Curseur personnalisé : un point chrome qui suit la souris, avec un halo
 * qui s'agrandit au survol des éléments interactifs. Désactivé sur mobile
 * et tactile.
 */
export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia?.('(pointer: coarse)')?.matches) return;

    const dot = document.createElement('div');
    dot.className = styles.dot;
    const halo = document.createElement('div');
    halo.className = styles.halo;
    document.body.appendChild(dot);
    document.body.appendChild(halo);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let visible = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        halo.style.opacity = '1';
      }
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        'a, button, [data-cursor="hover"]',
      );
      halo.classList.toggle(styles.hover, !!interactive);
    };

    const loop = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      halo.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      dot.remove();
      halo.remove();
    };
  }, []);

  return null;
}