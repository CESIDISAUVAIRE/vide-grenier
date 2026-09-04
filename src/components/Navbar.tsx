'use client';

import { useEffect, useRef } from 'react';
import { scrollTo } from '@/lib/smooth-scroll';
import styles from './Navbar.module.css';

interface NavbarProps {
  links: { label: string; target: string }[];
}

/**
 * Barre de navigation premium : fixe, fond sombre translucide, liens qui
 * déclenchent un scroll fluide (Lenis).
 */
export default function Navbar({ links }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      nav.classList.toggle(styles.scrolled, scrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (target: string) => {
    const el = document.querySelector(target);
    if (el) scrollTo(el);
  };

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Navigation">
      <a href="/" className={styles.brand} data-cursor="hover">
        <span className={styles.brandMark}>VG</span>
        <span className={styles.brandText}>Vide&nbsp;Grenier</span>
      </a>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label}>
            <button
              type="button"
              className={styles.link}
              onClick={() => go(link.target)}
              data-cursor="hover"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}