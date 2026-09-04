'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import AnnonceCard, { type Annonce } from './AnnonceCard';
import styles from './AnnonceGrid.module.css';

gsap.registerPlugin(ScrollTrigger);

interface AnnonceGridProps {
  annonces: Annonce[];
}

/**
 * Grille des annonces réelles (données de la base) avec apparition en cascade
 * (stagger GSAP) déclenchée au scroll.
 */
export default function AnnonceGrid({ annonces }: AnnonceGridProps) {
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.card'));

    // État initial : invisible.
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.92 });

    const st = ScrollTrigger.create({
      trigger: grid,
      start: 'top 85%',
      toggleActions: 'play none none none',
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          overwrite: true,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [annonces.length]);

  return (
    <section ref={gridRef} className={styles.grid} aria-label="Annonces">
      {annonces.map((annonce, i) => (
        <AnnonceCard key={annonce.id} annonce={annonce} index={i} />
      ))}
    </section>
  );
}