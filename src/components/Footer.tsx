'use client';

import styles from './Footer.module.css';

/**
 * Pied de page premium : sombre, avec marque et mentions.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>Vide&nbsp;Grenier</p>
        <p className={styles.note}>
          Collection privée de pièces rares &amp; vintage — CESI Bloc 5
        </p>
        <p className={styles.copy}>© {new Date().getFullYear()} — Tous droits réservés</p>
      </div>
    </footer>
  );
}