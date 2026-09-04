'use client';

import { useRef } from 'react';
import styles from './AnnonceCard.module.css';

export interface Annonce {
  id: number;
  titre: string;
  description: string;
  prix: number;
  categorie: string;
  imageUrl: string;
  createdAt: Date;
}

interface AnnonceCardProps {
  annonce: Annonce;
  index: number;
}

/**
 * Carte d'annonce premium : fond sombre, accent chrome/or, prix révélé au
 * survol, tilt 3D léger (parallax + ombre dynamique).
 */
export default function AnnonceCard({ annonce, index }: AnnonceCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--rx', `${-py * 8}deg`);
    card.style.setProperty('--ry', `${px * 8}deg`);
    card.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    card.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      style={{ '--i': index } as React.CSSProperties}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
    >
      <div className={styles.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={annonce.imageUrl} alt={annonce.titre} className={styles.image} />
        <span className={styles.category}>{annonce.categorie}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{annonce.titre}</h3>
        <p className={styles.description}>{annonce.description}</p>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Prix</span>
          <span className={styles.price}>{annonce.prix.toFixed(2)} €</span>
        </div>
      </div>
    </article>
  );
}