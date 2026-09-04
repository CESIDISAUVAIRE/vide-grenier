'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import { initSmoothScroll } from '@/lib/smooth-scroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fournisseur de scroll : initialise GSAP ScrollTrigger de manière fiable au
 * chargement de la page. Le scroll natif reste intact (fiable, sans blocage).
 * Rafraîchit ScrollTrigger après le montage complet pour éviter les warnings
 * "GSAP target not found" (positions calculées à froid).
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    initSmoothScroll();
    // Recalcule les positions de tous les triggers une fois le DOM monté,
    // et de nouveau au prochain tick pour couvrir le rendu des sections.
    ScrollTrigger.refresh();
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}