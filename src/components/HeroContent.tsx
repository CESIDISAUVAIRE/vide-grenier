'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap.js';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
import { scrollTo } from '@/lib/smooth-scroll';
import MagneticButton from './MagneticButton';
import styles from './HeroContent.module.css';

gsap.registerPlugin(ScrollTrigger);

interface HeroContentProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaTarget: string;
}

/**
 * Contenu superposé au hero scroll-frame : titre dramatique, sous-titre et
 * CTA, avec apparition animée (GSAP).
 * Le contenu fond et remonte pendant le scroll du hero, de sorte qu'il
 * disparaisse avant que la section suivante (Collection) n'arrive à l'écran.
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

    // Fade-out + montée du conteneur entier pendant le scroll du hero (scrub).
    // On anime le .wrap (pas les éléments) pour ne pas entrer en conflit avec
    // l'apparition en stagger. Le texte disparaît donc avant que la section
    // Collection n'arrive à l'écran, au lieu de rester collé dessus.
    gsap.to(wrap, {
      opacity: 0,
      y: -140,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap.parentElement || wrap,
        start: 'top top',
        end: 'bottom 80%',
        scrub: true,
      },
    });
  }, []);

  const go = () => {
    const el = document.querySelector(ctaTarget);
    if (el) scrollTo(el);
  };

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {/* Voile sombre : garantit le contraste du texte sur la vidéo */}
      <div className={styles.scrim} aria-hidden="true" />
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