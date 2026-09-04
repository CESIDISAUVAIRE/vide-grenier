'use client';

import { useEffect } from 'react';
import { initSmoothScroll } from '@/lib/smooth-scroll';

/**
 * Fournisseur de scroll : initialise GSAP ScrollTrigger de manière fiable au
 * chargement de la page. Le scroll natif reste intact (fiable, sans blocage).
 */
export default function SmoothScrollProvider() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return null;
}