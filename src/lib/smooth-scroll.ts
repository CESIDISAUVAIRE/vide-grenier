'use client';

import { gsap } from 'gsap/dist/gsap.js';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';

// Enregistre le plugin ScrollTrigger une seule fois.
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialise GSAP ScrollTrigger et le synchronise avec le scroll natif.
 * On n'utilise PAS Lenis pour le scroll de la page : le scroll natif est
 * fiable et sans risque de blocage. Lenis est conservé uniquement pour les
 * scrolls programmatiques fluides (voir scrollTo).
 */
export function initSmoothScroll() {
  ScrollTrigger.refresh();
  return null;
}

/**
 * Fait défiler la page vers une position cible (px), un sélecteur ou un élément,
 * avec un défilement fluide natif.
 */
export function scrollTo(target: number | string | Element) {
  let value: number;
  if (typeof target === 'number') {
    value = target;
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    value = el ? el.getBoundingClientRect().top + window.scrollY : 0;
  } else {
    value = target.getBoundingClientRect().top + window.scrollY;
  }

  window.scrollTo({ top: value, behavior: 'smooth' });
}