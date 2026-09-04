'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import { scrollTo } from '@/lib/smooth-scroll';
import MagneticButton from './MagneticButton';
import styles from './HeroContent.module.css';

interface HeroContentProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTarget: string;
}

/**
 * Contenu superposé au hero scroll-frame : titre dramatique, sous-titre et
 * CTA, avec apparition animée (GSAP).
 */
export default function HeroContent({
  title,
  subtitle,
  ctaLabel,
  ctaTarget,
}: HeroContentProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const els = Array.from(wrap.querySelectorAll<HTMLElement>('[data-reveal]'));
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.4,
      },
    );
  }, []);

  const go = () => {
    const el = document.querySelector(ctaTarget);
    if (el) scrollTo(el);
  };

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <p className={styles.eyebrow} data-reveal>
        Collection privée — Pièces rares &amp; vintage
      </p>
      <h1 className={styles.title} data-reveal>
        {title}
      </h1>
      <p className={styles.subtitle} data-reveal>
        {subtitle}
      </p>
      <MagneticButton className={styles.cta} onClick={go} data-reveal>
        {ctaLabel}
      </MagneticButton>
    </div>
  );
}