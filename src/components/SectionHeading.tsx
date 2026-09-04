'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import styles from './SectionHeading.module.css';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

/**
 * Titre de section premium avec apparition animée au scroll.
 */
export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    );
  }, []);

  return (
    <div ref={ref} className={styles.heading}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}