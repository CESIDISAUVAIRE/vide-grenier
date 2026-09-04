'use client';

import { useRef } from 'react';
import styles from './CategorySection.module.css';

interface Category {
  name: string;
  tagline: string;
  image: string;
}

interface CategorySectionProps {
  categories: Category[];
}

/**
 * Sections catégories curées avec tilt CSS léger au survol (parallax,
 * ombre dynamique).
 */
export default function CategorySection({ categories }: CategorySectionProps) {
  const onMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${-py * 10}deg`);
    el.style.setProperty('--ry', `${px * 10}deg`);
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };

  const onLeave = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <section className={styles.section} aria-label="Catégories">
      <div className={styles.grid}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={styles.tile}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            data-cursor="hover"
          >
            <div className={styles.media}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cat.image} alt={cat.name} className={styles.image} />
            </div>
            <div className={styles.overlay}>
              <h3 className={styles.name}>{cat.name}</h3>
              <p className={styles.tagline}>{cat.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}